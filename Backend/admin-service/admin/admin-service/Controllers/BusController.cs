using Microsoft.AspNetCore.Mvc;
using admin_service.Data;
using admin_service.Models;
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

        // GET: api/bus
        [HttpGet]
        public IActionResult GetBuses()
        {
            var buses = _context.Buses.ToList();
            return Ok(buses);
        }

        // GET: api/bus/5
        [HttpGet("{id}")]
        public IActionResult GetBus(long id)
        {
            var bus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (bus == null)
                return NotFound();
            return Ok(bus);
        }

        // POST: api/bus
        [HttpPost]
        public IActionResult CreateBus([FromBody] Bus bus)
        {
            if (bus == null)
                return BadRequest();

            _context.Buses.Add(bus);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBus), new { id = bus.Id }, bus);
        }

        // PUT: api/bus/5
        [HttpPut("{id}")]
        public IActionResult UpdateBus(long id, [FromBody] Bus bus)
        {
            if (bus == null || bus.Id != id)
                return BadRequest();

            var existingBus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (existingBus == null)
                return NotFound();

            existingBus.BusName = bus.BusName;
            existingBus.BusNumber = bus.BusNumber;
            existingBus.BusType = bus.BusType;
            existingBus.TotalSeats = bus.TotalSeats;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/bus/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBus(long id)
        {
            var bus = _context.Buses.FirstOrDefault(b => b.Id == id);
            if (bus == null)
                return NotFound();

            _context.Buses.Remove(bus);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
