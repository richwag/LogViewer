namespace LogViewer.Controllers
{
    public class LogFilter
    {
        public int applicationId { get; set; }
        public string messageTypes { get; set; } = "1|2|3|4";
        public string? messageContains { get; set; }
        public string? errorJsonContains { get; set; }
        public string? userContains { get; set; }
        public string? hostContains { get; set; }
        public int page { get; set; } = 0;
        public int pageSize { get; set; } = 50;
        public string environment {  get; set;} = "";
    }
}