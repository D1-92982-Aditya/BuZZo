namespace admin_service.DTO
{
    public class BoardingPointDto
    {
        public int BusScheduleId { get; set; }
        public string LocationName { get; set; }
        public string BoardingTime { get; set; } // "HH:mm:ss"
    }

}
