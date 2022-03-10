using LogViewer.LogViewer.DTOs;
using LogViewer.Services;
using Microsoft.AspNetCore.Mvc;

namespace LogViewer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ErrorManagementController : ControllerBase
    {
        private readonly IErrorManagementService errorManagement;

        public ErrorManagementController(IErrorManagementService errorManagement)
        {
            this.errorManagement = errorManagement;
        }

        public async Task<IEnumerable<string>> EnvironmentNames()
        {
            return await errorManagement.EnvironmentNames();
        }

        public async Task<Application[]> ApplicationInfos(string environment)
        {
            return await errorManagement.ApplicationInfos(environment);
        }

        public async Task<IEnumerable<MessageType>> MessageTypes(string environment)
        {
            return await errorManagement.MessageTypes(environment);
        }

        [HttpPost]
        public async Task<IEnumerable<ApplicationLog>> ApplicationLogs([FromBody] LogFilter logFilter)
        {
            return await errorManagement.ApplicationLogs(logFilter);
        }
    }
}