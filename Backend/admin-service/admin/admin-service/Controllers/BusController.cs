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
            if (bus == null) return BadRequest("Invalid bus data");

            var entity = new Bus
            {
                BusName = bus.BusName,
                BusNumber = bus.BusNumber,
                BusType = bus.BusType,
                TotalSeats = bus.TotalSeats
            };

            _context.Buses.Add(entity);
            _context.SaveChanges();
            return Ok(entity);
        }

        // =======================
        // Create bus with full schedule
        // =======================
        [HttpPost("full")]
        public IActionResult CreateBusFull([FromBody] AddFullBusDto dto)
        {
            if (dto == null) return BadRequest("Invalid payload");

            using var transaction = _context.Database.BeginTransaction();

            try
            {
                // Add Bus
                var bus = new Bus
                {
                    BusName = dto.Bus.BusName,
                    BusNumber = dto.Bus.BusNumber,
                    BusType = dto.Bus.BusType,
                    TotalSeats = dto.Bus.TotalSeats
                };
                _context.Buses.Add(bus);
                _context.SaveChanges();

                // Add Schedule
                var schedule = new BusSchedule
                {
                    BusId = bus.Id,
                    FromCity = dto.Schedule.FromCity,
                    ToCity = dto.Schedule.ToCity,
                    JourneyDate = dto.Schedule.JourneyDate,
                    DepartureTime = dto.Schedule.DepartureTime,
                    ArrivalTime = dto.Schedule.ArrivalTime,
                    TicketPrice = dto.Schedule.TicketPrice
                };
                _context.BusSchedules.Add(schedule);
                _context.SaveChanges();

                // Boarding Points
                foreach (var bp in dto.BoardingPoints)
                {
                    _context.BoardingPoints.Add(new BoardingPoint
                    {
                        BusScheduleId = schedule.Id,
                        LocationName = bp.LocationName,
                        BoardingTime = TimeSpan.Parse(bp.BoardingTime)
                    });
                }

                // Dropping Points
                foreach (var dp in dto.DroppingPoints)
                {
                    _context.DroppingPoints.Add(new DroppingPoint
                    {
                        BusScheduleId = schedule.Id,
                        LocationName = dp.LocationName,
                        DroppingTime = TimeSpan.Parse(dp.BoardingTime)
                    });
                }

                _context.SaveChanges();
                transaction.Commit();

                return CreatedAtAction(nameof(GetBus), new { id = bus.Id }, bus);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, $"Error saving bus: {ex.Message}");
            }
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

            var boardingPoints = _context.BoardingPoints
                .Where(bp => bp.BusScheduleId == id)
                .ToList();

            var droppingPoints = _context.DroppingPoints
                .Where(dp => dp.BusScheduleId == id)
                .ToList();

            _context.BoardingPoints.RemoveRange(boardingPoints);
            _context.DroppingPoints.RemoveRange(droppingPoints);
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

            // check bus exists
            var busExists = _context.Buses.Any(b => b.Id == schedule.BusId);
            if (!busExists)
                return BadRequest("Invalid BusId");

            _context.BusSchedules.Add(schedule);
            _context.SaveChanges();

            return Ok(schedule);
        }




    }
}
