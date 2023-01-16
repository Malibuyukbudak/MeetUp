using MeetUp.Data.Context;
using MeetUp.Data.Repository;
using MeetUp.Domain.Entities;

namespace MeetUp.Data.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public Dictionary<Type, object> repositories = new Dictionary<Type, object>();
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public IGenericRepository<T> GenericRepository<T>() where T : BaseEntity
        {

            if (repositories.ContainsKey(typeof(T)) == true)
            {
                return repositories[typeof(T)] as IGenericRepository<T>;
            }
            var repo = new GenericRepository<T>(_context);
            repositories.Add(typeof(T), repo);
            return repo;
        }
        public async Task<int> SaveChanges()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
