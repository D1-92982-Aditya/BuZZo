using System;
using System.Collections.Generic;

namespace admin_service.DTO
{
    public class AddFullBusDto
    {
        public BusDto Bus { get; set; }
        public BusScheduleDto Schedule { get; set; }
        public List<PointDto> BoardingPoints { get; set; } = new();
        public List<PointDto> DroppingPoints { get; set; } = new();
    }

    public class BusDto
    {
        public string BusName { get; set; }
        public string BusNumber { get; set; }
        public string BusType { get; set; }
        public int TotalSeats { get; set; }
    }

    public class BusScheduleDto
    {
        public string FromCity { get; set; }
        public string ToCity { get; set; }
        public DateTime JourneyDate { get; set; }
        public TimeSpan DepartureTime { get; set; }
        public TimeSpan ArrivalTime { get; set; }
        public double TicketPrice { get; set; }
    }

    public class PointDto
    {
        public string LocationName { get; set; }
        public string BoardingTime { get; set; } // "HH:mm" string from frontend
    }
}
