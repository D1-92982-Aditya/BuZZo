using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    [Table("boarding_points")]
    public class BoardingPoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column("location_name")]
        public string LocationName { get; set; }   // Wakad, Hinjewadi, Shivajinagar

        [Required]
        [Column("boarding_time")]
        public TimeSpan BoardingTime { get; set; } // LocalTime in Java maps to TimeSpan in C#

        // Foreign key property
        [Required]
        [Column("schedule_id")]
        public long BusScheduleId { get; set; }

        // Navigation property
        [ForeignKey("BusScheduleId")]
        public BusSchedule BusSchedule { get; set; }
    }
}
