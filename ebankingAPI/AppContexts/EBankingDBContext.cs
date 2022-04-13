using ebankingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ebankingAPI.AppContexts
{
    public class EBankingDBContext: DbContext
    {
        public EBankingDBContext(DbContextOptions<EBankingDBContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Currency> Currency { get; set; }
    }
}
