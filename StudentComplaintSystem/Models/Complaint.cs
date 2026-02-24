namespace StudentComplaintSystem.Models
{
    public class Complaint
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string StudentId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } = "Pending";
    }
}
