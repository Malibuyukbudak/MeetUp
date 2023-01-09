using MeetUp.Core.CQRS;


namespace MeetUp.Application.Queries.Event.GetByUserIdEvent
{
    public class GetByUserIdEventQuery : IBaseQuery<List<GetByUserIdResponse>>
    {
    }
}
