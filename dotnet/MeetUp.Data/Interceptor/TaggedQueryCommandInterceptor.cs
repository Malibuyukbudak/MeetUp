using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Data.Common;

namespace MeetUp.Data.Interceptor
{
    public class TaggedQueryCommandInterceptor : DbCommandInterceptor
    {
        public override InterceptionResult<DbDataReader> ReaderExecuting(
            DbCommand command,
            CommandEventData eventData,
            InterceptionResult<DbDataReader> result)
        {
            ModifyCommand(command);

            return result;
        }

        public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
            DbCommand command,
            CommandEventData eventData,
            InterceptionResult<DbDataReader> result,
            CancellationToken cancellationToken = default)
        {
            ModifyCommand(command);

            return new ValueTask<InterceptionResult<DbDataReader>>(result);
        }

        private static void ModifyCommand(DbCommand command)
        {
            if (command.CommandText.StartsWith("-- Use hint: robust plan", StringComparison.Ordinal))
            {
                command.CommandText += " OPTION (ROBUST PLAN)";
            }
            Console.WriteLine(command.CommandText);

        }
        
    }
}
