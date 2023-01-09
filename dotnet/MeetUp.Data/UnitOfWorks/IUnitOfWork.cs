using MeetUp.Data.Repository;
using MeetUp.Domain.Entities;

namespace MeetUp.Data.UnitOfWorks
{
    public interface IUnitOfWork
    {
        Task<int> SaveChanges();
        IGenericRepository<T> GenericRepository<T>() where T : BaseEntity;
    }
}
