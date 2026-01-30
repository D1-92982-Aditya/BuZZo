namespace admin_service.DTO
{
    using System;

    namespace admin_service.DTO
    {
        public class BusScheduleDto
        {
            public long Id { get; set; }
            public long BusId { get; set; }
            public string FromCity { get; set; }
            public string ToCity { get; set; }
            public DateTime JourneyDate { get; set; }
            public TimeSpan DepartureTime { get; set; }
            public TimeSpan ArrivalTime { get; set; }
            public decimal TicketPrice { get; set; }
            public string Status { get; set; }
        }
    }

}
