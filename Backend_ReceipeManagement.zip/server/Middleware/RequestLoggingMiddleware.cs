using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;

namespace ReceipeManagement.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

            // Log request body (if needed)
            // context.Request.EnableBuffering();
            // var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
            // context.Request.Body.Position = 0;
            // _logger.LogInformation($"Request Body: {body}");

            await _next(context);

            _logger.LogInformation($"Response: {context.Response.StatusCode}");
        }
    }
}