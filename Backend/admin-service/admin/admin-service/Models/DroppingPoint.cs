using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    [Table("dropping_points")]
    public class DroppingPoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column("location_name")]
        public string LocationName { get; set; }  // Andheri, Dadar, Borivali

        [Required]
        [Column("dropping_time")]
        public TimeSpan DroppingTime { get; set; }

        [Required]
        [Column("schedule_id")]
        public long BusScheduleId { get; set; }

        [ForeignKey("BusScheduleId")]
        public BusSchedule BusSchedule { get; set; }
    }
}
