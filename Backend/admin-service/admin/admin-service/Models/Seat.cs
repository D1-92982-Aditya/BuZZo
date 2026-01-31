using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    public class Seat
    {
        public long Id { get; set; }

        [Column("seat_number")]
        public string SeatNumber { get; set; }

        [Column("bus_id")]
        public long BusId { get; set; }

        public Bus Bus { get; set; }
    }
}
