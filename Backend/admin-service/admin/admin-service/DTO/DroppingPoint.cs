namespace admin_service.DTO
{
    public class DroppingPointDto
    {
        public int BusScheduleId { get; set; }
        public string LocationName { get; set; }
        public string DroppingTime { get; set; } // "HH:mm:ss"
    }

}
