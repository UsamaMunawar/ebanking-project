using ebankingAPI.AppContexts;
using ebankingAPI.Models;
using ebankingAPI.Services.Interfaces;

namespace ebankingAPI.Services
{
    public class CurrencyService : ICurrencyService
    {
        private EBankingDBContext _dbContext;

        public CurrencyService(EBankingDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Currency> GetAllCurrencies()
        {
            return _dbContext.Currency.ToList();
        }

        public Currency GetById(int Id)
        {
            var currency = _dbContext.Currency.Where(a => a.Id == Id).FirstOrDefault();
            if (currency == null) return null;
            return currency;
        }

        public Currency GetByShortName(string ShortName)
        {
            var currency = _dbContext.Currency.Where(a => a.ShortName == ShortName).FirstOrDefault();
            if (currency == null) return null;
            return currency;
        }
    }
}
