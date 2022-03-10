namespace LogViewer.LogViewer.DTOs
{
    public partial class ApplicationLog
    {
        public Guid LogId { get; set; }
        public int ApplicationId { get; set; }
        public string Message { get; set; } = null!;
        public short MessageTypeId { get; set; }
        public string Host { get; set; } = null!;
        public string CurrentUserName { get; set; } = null!;
        public string? FullErrorJson { get; set; }
        public string DateTimeUtc { get; set; } = null!;
    }
}
