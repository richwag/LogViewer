using LogViewer.LogViewer.DTOs;
using LogViewer.Controllers;
using Microsoft.EntityFrameworkCore;

namespace LogViewer.Services
{
    public class ErrorManagementService : IErrorManagementService
    {
        private readonly LogViewer.Models.ErrorContext context;
        private readonly IConfiguration configuration;

        public ErrorManagementService(LogViewer.Models.ErrorContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        public async Task<Application[]> ApplicationInfos(string environment)
        {
            context.Environment = environment;
            return await context.ApplicationInfos.Select(a => new Application()
            {
                ApplicationId = a.ApplicationId,
                ApplicationName = a.ApplicationName
            }).ToArrayAsync();
        }

        public async Task<IEnumerable<MessageType>> MessageTypes(string environment)
        {
            context.Environment = environment;
            return await context.MessageTypes.Select((m) => new MessageType()
            {
                MessageTypeId = m.MessageTypeId,
                Name = m.Name
            }).ToListAsync();
        }

        public async Task<IEnumerable<ApplicationLog>> ApplicationLogs(LogFilter logFilter)
        {
            short[] messageTypesArray = logFilter.messageTypes.Split('|').Select(i => short.Parse(i)).ToArray();

            context.Environment = logFilter.environment;

            var query = context.ApplicationLogs.Where(l => l.ApplicationId == logFilter.applicationId && messageTypesArray.Contains(l.MessageTypeId));

            if (!string.IsNullOrWhiteSpace(logFilter.messageContains))
            {
                query = query.Where(l => l.Message.Contains(logFilter.messageContains));
            }

            if (!string.IsNullOrWhiteSpace(logFilter.hostContains))
            {
                query = query.Where(l => l.Host.Contains(logFilter.hostContains));
            }

            if (!string.IsNullOrWhiteSpace(logFilter.errorJsonContains))
            {
                query = query.Where(l => l.FullErrorJson != null && l.FullErrorJson.Contains(logFilter.errorJsonContains));
            }

            if (!string.IsNullOrWhiteSpace(logFilter.userContains))
            {
                query = query.Where(l => l.CurrentUserName.Contains(logFilter.userContains));
            }

            return await query.OrderByDescending(l => l.DateTime).Skip(logFilter.page * logFilter.pageSize).Take(logFilter.pageSize).Select((e) => new ApplicationLog()
            {
                ApplicationId = e.ApplicationId,
                CurrentUserName = e.CurrentUserName,
                DateTimeUtc = new DateTime(e.DateTime, DateTimeKind.Utc).ToString(),
                LogId = e.LogId,
                FullErrorJson = e.FullErrorJson,
                Host = e.Host,
                Message = e.Message,
                MessageTypeId = e.MessageTypeId
            }).ToListAsync();
        }

        public async Task<string[]> EnvironmentNames()
        {
            return await Task.Run(() => configuration["Environments"].Split("|").ToArray<string>());
        }
    }
}
