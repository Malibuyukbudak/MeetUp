using MediatR;
using MeetUp.Data.Behaviours;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using Microsoft.Extensions.DependencyInjection;

namespace MeetUp.Core.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddTransactionService(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TransactionBehavior<,>));

            return services;

        }
        public static IServiceCollection GenericRepositoryService(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            return services;
        }

        public static IServiceCollection UnitOfWorkService(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;
        }

    }
}
