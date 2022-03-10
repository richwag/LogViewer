using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LogViewer.LogViewer.Models
{
    public partial class LogEntry
    {
        public LogEntry()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid LogId { get; set; } = Guid.NewGuid();
        public int ApplicationId { get; set; }
        public string Message { get; set; } = null!;
        public short MessageTypeId { get; set; }
        public string Host { get; set; } = null!;
        public string CurrentUserName { get; set; } = null!;
        public string? FullErrorJson { get; set; }
        public long DateTime { get; set; }

        [ForeignKey("ApplicationId")]
        public virtual Application Application { get; set; } = null!;
        [ForeignKey("MessageTypeId")]
        public virtual MessageType MessageType { get; set; } = null!;
    }
}
