using MeetUp.Data.Context;
using MeetUp.Data.Repository;
using MeetUp.Domain.Entities;

namespace MeetUp.Data.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public IGenericRepository<T> GenericRepository<T>() where T : BaseEntity
        {
            return new GenericRepository<T>(_context);
        }
        public async Task<int> SaveChanges()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
