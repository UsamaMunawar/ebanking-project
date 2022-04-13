using ebankingAPI.Models;

namespace ebankingAPI.Services.Interfaces
{
    public interface ICurrencyService
    {
        IEnumerable<Currency> GetAllCurrencies();
        Currency GetByShortName(string ShortName);
        Currency GetById(int Id);
    }
}
