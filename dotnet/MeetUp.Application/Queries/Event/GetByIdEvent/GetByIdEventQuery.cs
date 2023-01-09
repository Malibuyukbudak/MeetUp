using MeetUp.Core.CQRS;


namespace MeetUp.Application.Queries.Event.GetByIdEvent
{
    public class GetByIdEventQuery : IBaseQuery<GetByIdEventResponse>
    {
        public int Id;
    }
}
