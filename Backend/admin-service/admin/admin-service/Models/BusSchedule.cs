using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    [Table("bus_schedules")]
    public class BusSchedule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column("from_city")]
        public string FromCity { get; set; }

        [Required]
        [Column("to_city")]
        public string ToCity { get; set; }

        [Required]
        [Column("journey_date")]
        public DateTime JourneyDate { get; set; } // Only date part will be used

        [Required]
        [Column("departure_time")]
        public TimeSpan DepartureTime { get; set; } // Use TimeSpan for time

        [Required]
        [Column("arrival_time")]
        public TimeSpan ArrivalTime { get; set; } // Use TimeSpan for time

        [Required]
        [Column("ticket_price")]
        public double TicketPrice { get; set; }

        // Foreign key relationship
        [Required]
        [ForeignKey("Bus")]
        [Column("bus_id")]
        public long BusId { get; set; }

        public Bus Bus { get; set; }
    }
}
