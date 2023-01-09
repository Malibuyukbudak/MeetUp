using MediatR;

namespace MeetUp.Core.CQRS
{
    public interface IBaseQuery<TResponse> : IRequest<TResponse>
    {
    }
}
