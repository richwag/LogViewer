using System.ComponentModel.DataAnnotations;

namespace LogViewer.LogViewer.Models
{
    public partial class Application
    {
        public Application()
        {
            ApplicationLogs = new HashSet<LogEntry>();
        }

        [Key]
        public int ApplicationId { get; set; }
        public string ApplicationName { get; set; } = null!;

        public virtual ICollection<LogEntry> ApplicationLogs { get; set; }
    }
}
