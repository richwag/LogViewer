using Microsoft.EntityFrameworkCore;

namespace LogViewer.LogViewer.Models
{
    public partial class ErrorContext : DbContext
    {
        public ErrorContext()
        {
        }

        public ErrorContext(DbContextOptions<ErrorContext> options)
            : base(options)
        {

        }

        public string Environment { get; set; } = "DEV";
        public virtual DbSet<Application> ApplicationInfos { get; set; } = null!;
        public virtual DbSet<LogEntry> ApplicationLogs { get; set; } = null!;
        public virtual DbSet<MessageType> MessageTypes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var folder = System.Environment.SpecialFolder.LocalApplicationData;
                var path = System.Environment.GetFolderPath(folder);
                var DbPath = System.IO.Path.Join(path, "error.db");

                optionsBuilder.UseSqlite($"DataSource={DbPath}");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>(entity =>
            {
                entity.HasKey(e => e.ApplicationId);

                entity.ToTable("Application");

                entity.Property(e => e.ApplicationName)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LogEntry>(entity =>
            {
                entity.HasKey(e => e.LogId);

                entity.ToTable("LogEntry");

                entity.Property(e => e.LogId);

                entity.Property(e => e.CurrentUserName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DateTime)
                    .HasColumnName("DateTime");

                entity.Property(e => e.FullErrorJson).IsUnicode(false);

                entity.Property(e => e.Host)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Application)
                    .WithMany(p => p.ApplicationLogs)
                    .HasForeignKey(d => d.ApplicationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LogEntry_Application");

                entity.HasOne(d => d.MessageType)
                    .WithMany(p => p.ApplicationLogs)
                    .HasForeignKey(d => d.MessageTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LogEntry_MessageType");
            });


            modelBuilder.Entity<MessageType>(entity =>
            {
                entity.ToTable("MessageType");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MessageType>().HasData(
                new MessageType { MessageTypeId = 1, Name = "Error" },
                new MessageType { MessageTypeId = 2, Name = "Information" },
                new MessageType { MessageTypeId = 3, Name = "Warning" },
                new MessageType { MessageTypeId = 4, Name = "Debug" }
            );

            modelBuilder.Entity<Application>().HasData(
                new Application { ApplicationId = 1, ApplicationName = "Application 1" },
                new Application { ApplicationId = 2, ApplicationName = "Application 2" }
            );

            modelBuilder.Entity<LogEntry>().HasData(
                new LogEntry { ApplicationId = 1, MessageTypeId = 1, Host = "Host", CurrentUserName = "Foo", Message = "Exception", FullErrorJson = "{\"Name\": \"name\", \"Value\": \"value\"}", DateTime = DateTime.UtcNow.Ticks },
                new LogEntry { ApplicationId = 2, MessageTypeId = 2, Host = "Host", CurrentUserName = "Foo", Message = "Good Morning", DateTime = DateTime.UtcNow.Ticks },
                new LogEntry { ApplicationId = 1, MessageTypeId = 3, Host = "Host", CurrentUserName = "Foo", Message = "Warning", DateTime = DateTime.UtcNow.Ticks },
                new LogEntry { ApplicationId = 2, MessageTypeId = 4, Host = "Host", CurrentUserName = "Foo", Message = "Some debug information", DateTime = DateTime.UtcNow.Ticks }
            );

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
