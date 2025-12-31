using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace admin_service.Models
{
    [Table("buses")]
    public class Bus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column("bus_name")]
        public string BusName { get; set; }  // Volvo, Neeta

        [Required]
        [Column("bus_number")]
        public string BusNumber { get; set; }  // MH12AB1234

        [Required]
        [Column("bus_type")]
        public string BusType { get; set; }  // AC, NON_AC, SLEEPER

        [Required]
        [Column("total_seats")]
        public int TotalSeats { get; set; }  // 40, 45
    }
}
