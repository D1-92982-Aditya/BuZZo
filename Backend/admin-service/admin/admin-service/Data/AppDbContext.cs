using Microsoft.EntityFrameworkCore;
using admin_service.Models;

namespace admin_service.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusSchedule> BusSchedules { get; set; }
        public DbSet<DroppingPoint> DroppingPoints { get; set; }
        public DbSet<BoardingPoint> BoardingPoints { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<SeatBooking> SeatBookings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraint on BusNumber
            modelBuilder.Entity<Bus>()
                .HasIndex(b => b.BusNumber)
                .IsUnique();

            // Configure BusSchedule -> Bus relationship
            modelBuilder.Entity<BusSchedule>()
                .HasOne(bs => bs.Bus)
                .WithMany() // Optional: can add List<BusSchedule> in Bus for reverse navigation
                .HasForeignKey(bs => bs.BusId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure DroppingPoint -> BusSchedule relationship
            modelBuilder.Entity<DroppingPoint>()
                .HasOne(dp => dp.BusSchedule)
                .WithMany() // Optional: can add List<DroppingPoint> in BusSchedule for reverse navigation
                .HasForeignKey(dp => dp.BusScheduleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure BoardingPoint -> BusSchedule relationship
            modelBuilder.Entity<BoardingPoint>()
                .HasOne(bp => bp.BusSchedule)
                .WithMany() // Optional: can add List<BoardingPoint> in BusSchedule for reverse navigation
                .HasForeignKey(bp => bp.BusScheduleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
