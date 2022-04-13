using ebankingAPI.Models;

namespace ebankingAPI.Services
{
    public interface IAccountService
    {
        Account AuthenticateByAccountNumber(string AccountNumber, string Pin);
        Account AuthenticateByUsername(string Username, string Password);
        IEnumerable<Account> GetAllAccounts();
        Account Create(Account account, string Pin, string ConfirmPin, string Password, string ConfirmPassword);
        Account Update(Account account, string Pin=null, string Password=null);
        void Delete(int Id);
        Account GetById(int Id);
        Account GetByAccountNumber(string AccountNumber);

    }
}
