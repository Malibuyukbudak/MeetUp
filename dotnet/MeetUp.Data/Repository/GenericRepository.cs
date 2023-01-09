using MeetUp.Data.Context;
using MeetUp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MeetUp.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public async Task<bool> AddAsync(T entity)
        {
            var entityEntry = await _dbSet.AddAsync(entity);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> AddAsync(List<T> entity)
        {
            await _dbSet.AddRangeAsync(entity);
            return true;
        }
        public bool Delete(T entity)
        {
            entity.IsDeleted = true;
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _dbSet.FirstOrDefaultAsync(data => data.Id == id);
            if (entity == null) return false;
            return Delete(entity);
        }
        public bool Update(T entity)
        {
            var entityEntry = _dbSet.Update(entity);
            return entityEntry.State == EntityState.Modified;
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>>? filter = null)
        {
            return filter == null ? await _dbSet.ToListAsync()
                : await _dbSet.Where(filter).ToListAsync();
        }
        public IQueryable<T> GetAllQuery(Expression<Func<T, bool>>? filter = null)
        {
            return filter == null ? _dbSet
                : _dbSet.Where(filter);
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.SingleOrDefaultAsync(data => data.Id == id);
        }
        public async Task<T> GetWhere(Expression<Func<T, bool>> filter)
        {
            return await _dbSet.SingleOrDefaultAsync(filter);
        }
    }
}
