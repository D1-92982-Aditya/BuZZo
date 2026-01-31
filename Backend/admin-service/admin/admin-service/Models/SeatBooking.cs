using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    [Table("seat_bookings")]
    public class SeatBooking
    {
        public long Id { get; set; }

        [Column("booked")]
        public bool Booked { get; set; }

        // 👇 Explicit FK mapping (THIS FIXES THE ERROR)
        [Column("schedule_id")]
        public long ScheduleId { get; set; }

        [ForeignKey(nameof(ScheduleId))]
        public BusSchedule BusSchedule { get; set; }

        // 👇 Explicit FK mapping
        [Column("seat_id")]
        public long SeatId { get; set; }

        [ForeignKey(nameof(SeatId))]
        public Seat Seat { get; set; }
    }
}
