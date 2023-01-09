using FluentValidation;
using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Core.Behaviours;
using MeetUp.Core.Token;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Runtime.Loader;

namespace MeetUp.Core.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection TokenHandlerService(this IServiceCollection services)
        {
            services.AddScoped<ITokenHandler, TokenHandler>();
            return services;
        }
        public static IServiceCollection AddMediatRService(this IServiceCollection services)
        {
            var path = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            var assembly = Directory.GetFiles(path, "MeetUp.Application.dll", SearchOption.TopDirectoryOnly)
                .Select(AssemblyLoadContext.Default.LoadFromAssemblyPath)
                .FirstOrDefault();
            services.AddMediatR(assembly);

            return services;
        }
        public static IServiceCollection AddValidatorsService(this IServiceCollection services)
        {
            var path = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            var assembly = Directory.GetFiles(path, "MeetUp.Core.dll", SearchOption.TopDirectoryOnly)
                .Select(AssemblyLoadContext.Default.LoadFromAssemblyPath)
                .FirstOrDefault();
            services.AddValidatorsFromAssembly(assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            return services;

        }
        public static IServiceCollection AddCachingService(this IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(CachingBehavior<,>));
            return services;
        }

        public static IServiceCollection UserAccessorService(this IServiceCollection services)
        {
            services.AddScoped<IUserAccessor, UserAccessor>();
            return services;
        }

    }
}
