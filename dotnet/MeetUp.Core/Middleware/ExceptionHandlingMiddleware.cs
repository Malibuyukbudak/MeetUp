using MeetUp.Core.Utilities.Result;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace MeetUp.Core.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await this._next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            if (exception is FluentValidation.ValidationException)
                return CreateValidationException(context, exception);

            return context.Response.WriteAsync(
                Result.Error(exception.Message).ToString()
                );
        }

        private Task CreateValidationException(HttpContext context, Exception exception)
        {
            context.Response.StatusCode = Convert.ToInt32(HttpStatusCode.BadRequest);
            var errors = ((FluentValidation.ValidationException)exception).Errors;

            string message = "";

            foreach (var error in errors)
            {
                message += error.ErrorMessage.ToString() + "\n";
            }

            return context.Response.WriteAsync(
                Result.Error(message).ToString()
                );
        }
    }
}
