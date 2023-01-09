using MediatR;

namespace MeetUp.Core.CQRS
{
    public interface IBaseCommand<TResponse> : IRequest<TResponse>
    {
    }
}
