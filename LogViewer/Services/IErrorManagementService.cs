using LogViewer.LogViewer.DTOs;
using LogViewer.Controllers;

namespace LogViewer.Services
{
    public interface IErrorManagementService
    {
        Task<string[]> EnvironmentNames();
        Task<Application[]> ApplicationInfos(string environment);
        Task<IEnumerable<ApplicationLog>> ApplicationLogs(LogFilter logFilter);
        Task<IEnumerable<MessageType>> MessageTypes(string environment);
    }
}