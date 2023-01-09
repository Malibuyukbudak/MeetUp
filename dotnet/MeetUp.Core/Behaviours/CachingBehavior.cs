using MediatR;
using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;

namespace MeetUp.Core.Behaviours
{
    public class CachingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>, ICachableRequest
    {
        public IMemoryCache MemoryCache { get; }
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CachingBehavior(IMemoryCache memoryCache, IHttpContextAccessor httpContextAccessor)
        {
            MemoryCache = memoryCache;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            //var key = _httpContextAccessor.HttpContext.Request.Path;
            var key = "a";
            TResponse response;
            if (request.GetType().GetInterfaces().Contains(typeof(IBaseCommand<TResponse>)))
            {
                MemoryCache.Remove(key);
                response = await next();
            }
            else if (request.GetType().GetInterfaces().Contains(typeof(IBaseQuery<TResponse>)))
            {
                if (MemoryCache.TryGetValue(key, out TResponse cachedResponse))
                {
                    return cachedResponse;
                }
                response = await next();
                MemoryCache.Set(key, response);
            }
            else
            {
                response = await next();
            }

            return response;
        }
    }
}
