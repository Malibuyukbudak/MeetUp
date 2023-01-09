using System.Linq.Expressions;

namespace MeetUp.Data.Repository
{
    public interface IGenericRepository<T>
    {
        Task<bool> AddAsync(T entity);
        Task<bool> AddAsync(List<T> entity);
        bool Update(T entity);
        Task<bool> DeleteAsync(int id);
        bool Delete(T entity);
        Task<List<T>> GetAll(Expression<Func<T, bool>>? filter = null);
        IQueryable<T> GetAllQuery(Expression<Func<T, bool>>? filter = null);
        Task<T> GetByIdAsync(int id);
        Task<T> GetWhere(Expression<Func<T, bool>>? filter = null);
    }
}
