using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LogViewer.LogViewer.Models
{
    public partial class MessageType
    {
        public MessageType()
        {
            ApplicationLogs = new HashSet<LogEntry>();
        }

        [Key]
        public short MessageTypeId { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<LogEntry> ApplicationLogs { get; set; }
    }
}
