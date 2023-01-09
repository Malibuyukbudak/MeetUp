using MeetUp.Core.Middleware;
using Microsoft.AspNetCore.Builder;

namespace MeetUp.Core.Extensions
{
    public static class BuilderExtension
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            return app;
        }
    }
}
