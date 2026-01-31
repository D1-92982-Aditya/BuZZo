using admin_service.Data;
using admin_service.DTO;
using admin_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace admin_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BusController(AppDbContext context)
        {
            _context = context;
        }

        // =======================
        // Get all buses
        // =======================
        [HttpGet]
        public IActionResult GetBuses()
        {
            var buses = _context.Buses.ToList();
            return Ok(buses);
        }

        // =======================
        // Get bus by Id
        // =======================
        [HttpGet("{id}")]
        public IActionResult GetBus(long id)
        {
            var bus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (bus == null) return NotFound();
            return Ok(bus);
        }

        // =======================
        // Create a bus
        // =======================
        [HttpPost]
        public IActionResult CreateBus([FromBody] BusDto bus)
        {
            if (bus == null)
                return BadRequest("Invalid bus data");

            var entity = new Bus
            {
                BusName = bus.BusName,
                BusNumber = bus.BusNumber,
                BusType = bus.BusType,
                TotalSeats = bus.TotalSeats
            };

            // 1️⃣ Save Bus
            _context.Buses.Add(entity);
            _context.SaveChanges();   // entity.Id available

            // 2️⃣ Auto-generate Seats (1A, 1B, 1C...)
            var columns = new[] { "A", "B", "C", "D", "E", "F" };
            int seatCount = 0;

            for (int row = 1; seatCount < entity.TotalSeats; row++)
            {
                foreach (var col in columns)
                {
                    if (seatCount >= entity.TotalSeats)
                        break;

                    _context.Seats.Add(new Seat
                    {
                        BusId = entity.Id,
                        SeatNumber = $"{row}{col}"
                    });

                    seatCount++;
                }
            }

            _context.SaveChanges();

            return Ok(entity);
        }


       

        // =======================
        // Update bus
        // =======================
        [HttpPut("{id}")]
        public IActionResult UpdateBus(long id, [FromBody] Bus bus)
        {
            if (bus == null || bus.Id != id) return BadRequest();

            var existingBus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (existingBus == null) return NotFound();

            existingBus.BusName = bus.BusName;
            existingBus.BusNumber = bus.BusNumber;
            existingBus.BusType = bus.BusType;
            existingBus.TotalSeats = bus.TotalSeats;

            _context.SaveChanges();
            return NoContent();
        }

        // =======================
        // Delete bus
        // =======================
        [HttpDelete("{id}")]
        public IActionResult DeleteBus(long id)
        {
            var bus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (bus == null) return NotFound();

            _context.Buses.Remove(bus);
            _context.SaveChanges();
            return NoContent();
        }

        // =======================
        // Add Boarding Points
        // =======================
        [HttpPost("boardingpoints")]
        public IActionResult AddBoardingPoints([FromBody] List<BoardingPointDto> points)
        {
            if (points == null || !points.Any()) return BadRequest("No points provided");

            var entities = points.Select(p => new BoardingPoint
            {
                BusScheduleId = p.BusScheduleId,
                LocationName = p.LocationName,
                BoardingTime = TimeSpan.Parse(p.BoardingTime)
            }).ToList();

            _context.BoardingPoints.AddRange(entities);
            _context.SaveChanges();

            return Ok(entities);
        }

        // =======================
        // Add Dropping Points
        // =======================
        [HttpPost("droppingpoints")]
        public IActionResult AddDroppingPoints([FromBody] List<DroppingPointDto> points)
        {
            if (points == null || !points.Any()) return BadRequest("No points provided");

            var entities = points.Select(p => new DroppingPoint
            {
                BusScheduleId = p.BusScheduleId,
                LocationName = p.LocationName,
                DroppingTime = TimeSpan.Parse(p.DroppingTime)
            }).ToList();

            _context.DroppingPoints.AddRange(entities);
            _context.SaveChanges();

            return Ok(entities);
        }

        // =======================
        // Get scheduled buses with full details
        // =======================

        [HttpGet("scheduled")]
        public IActionResult GetScheduledBuses()
        {
            var buses = _context.BusSchedules
                .Select(x => new
                {
                    id = x.Id,
                    busId = x.BusId,
                    fromCity = x.FromCity,
                    toCity = x.ToCity,
                    journeyDate = x.JourneyDate,
                    departureTime = x.DepartureTime,
                    arrivalTime = x.ArrivalTime,
                    ticketPrice = x.TicketPrice
                })
                .ToList();

            return Ok(buses);
        }

        //cancel

        [HttpDelete("cancel/{id}")]
        public IActionResult CancelBus(long id)
        {
            var schedule = _context.BusSchedules.FirstOrDefault(x => x.Id == id);
            if (schedule == null)
                return NotFound("Bus schedule not found");

            // 1️⃣ Seat bookings (MOST IMPORTANT)
            var seatBookings = _context.SeatBookings
                .Where(sb => sb.ScheduleId == id)
                .ToList();

            // 2️⃣ Boarding points
            var boardingPoints = _context.BoardingPoints
                .Where(bp => bp.BusScheduleId == id)
                .ToList();

            // 3️⃣ Dropping points
            var droppingPoints = _context.DroppingPoints
                .Where(dp => dp.BusScheduleId == id)
                .ToList();

            // 4️⃣ Delete in order
            _context.SeatBookings.RemoveRange(seatBookings);
            _context.BoardingPoints.RemoveRange(boardingPoints);
            _context.DroppingPoints.RemoveRange(droppingPoints);

            // 5️⃣ Finally delete schedule
            _context.BusSchedules.Remove(schedule);

            _context.SaveChanges();

            return Ok(new { message = "Bus cancelled successfully" });
        }



        // =======================
        // Create bus schedule ONLY
        // =======================
        [HttpPost("bus-schedule")]
        public IActionResult CreateBusSchedule([FromBody] BusSchedule schedule)
        {
            if (schedule == null)
                return BadRequest("Invalid schedule data");

            // 1️⃣ Check bus exists
            var busExists = _context.Buses.Any(b => b.Id == schedule.BusId);
            if (!busExists)
                return BadRequest("Invalid BusId");

            // 2️⃣ Save schedule
            _context.BusSchedules.Add(schedule);
            _context.SaveChanges(); // schedule.Id available

            // 3️⃣ Get all seats of this bus
            var seats = _context.Seats
                .Where(s => s.BusId == schedule.BusId)
                .ToList();

            // 4️⃣ Create seat_bookings (booked = false)
            foreach (var seat in seats)
            {
                _context.SeatBookings.Add(new SeatBooking
                {
                    SeatId = seat.Id,
                    ScheduleId = schedule.Id,
                    Booked = false
                });
            }

            _context.SaveChanges();

            return Ok(schedule);
        }





    }
}
