using Microsoft.EntityFrameworkCore.Design;

namespace MeetUp.Data.Context
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var context = new ApplicationDbContext();
            return context;
        }
    }
}
