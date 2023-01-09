using MediatR;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Commands.Event.UpdateEvent
{
    public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand, bool>
    {

        private readonly IGenericRepository<Domain.Entities.Event> _genericRepository;
        public UpdateEventCommandHandler(IUnitOfWork unitOfWork)
        {
            _genericRepository = unitOfWork.GenericRepository<Domain.Entities.Event>();
        }
        public async Task<bool> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var eventData = await _genericRepository.GetByIdAsync(request.Id);
            eventData.Description = request.Description;
            eventData.State = request.State;
            eventData.Title = request.Title;
            eventData.Capacity = request.Capacity;
            eventData.CategoryId = request.CategoryId;
            eventData.City = request.City;
            eventData.Image = request.Image;
            eventData.Created = request.Created;
            return true;
            //return _genericRepository.Update(request.Event);
        }
    }
}
