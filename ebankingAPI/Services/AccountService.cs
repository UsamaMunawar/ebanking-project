using ebankingAPI.AppContexts;
using ebankingAPI.Models;
using System.Text;

namespace ebankingAPI.Services
{
    public class AccountService : IAccountService
    {
        private EBankingDBContext _dbContext;

        public AccountService(EBankingDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Account AuthenticateByAccountNumber(string AccountNumber, string Pin)
        {
            if(string.IsNullOrEmpty(AccountNumber) || string.IsNullOrEmpty(Pin)) { return null; }



            var account = _dbContext.Accounts.Where(a => a.AccountNumberGenerated == AccountNumber).FirstOrDefault();
            if (account == null)
                return null;
            if(!VerifyPinHash(Pin, account.PinHash, account.PinSalt))
                return null;

            return account;

        }

        public Account AuthenticateByUsername(string Username, string Password)
        {
            var account = _dbContext.Accounts.Where(a => a.Username == Username).FirstOrDefault();
            if (account == null)
                return null;
            if (!VerifyPasswordHash(Password, account.PasswordHash, account.PasswordSalt))
                return null;
                
            return account;

        }

        public static bool VerifyPinHash(string pin, byte[] pinHash, byte[] pinSalt)
        {
            if (string.IsNullOrEmpty(pin)) throw new ArgumentNullException("Pin");
            using(var hmac = new System.Security.Cryptography.HMACSHA512(pinSalt))
            {
                var computedPinHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pin));
                for(int i = 0; i < computedPinHash.Length; i++)
                {
                    if(computedPinHash[i] != pinHash[i]) return false;
                }
            }
            return true;
        }

        public static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            if (string.IsNullOrEmpty(password)) throw new ArgumentNullException("Pin");
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedPasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedPasswordHash.Length; i++)
                {
                    if (computedPasswordHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public Account Create(Account account, string Pin, string ConfirmPin, string Password, string ConfirmPassword)
        {
            //throw new NotImplementedException();
            if (_dbContext.Accounts.Any(a => a.Email == account.Email)) throw new ApplicationException("An account already exists with this email");
            if (!Pin.Equals(ConfirmPin)) throw new ApplicationException("Pincode do not match");

            byte[] pinHash, pinSalt, passwordHash, passwordSalt;
            CreatePinHash(Pin, out pinHash, out pinSalt);
            CreatePasswordHash(Password, out passwordHash, out passwordSalt);
            account.PinHash = pinHash;
            account.PinSalt = pinSalt;
            account.PasswordHash = passwordHash;
            account.PasswordSalt = passwordSalt;

            _dbContext.Accounts.Add(account);
            _dbContext.SaveChanges();
            
            return account;
        }

        public static void CreatePinHash(string pin, out byte[] pinHash, out byte[] pinSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                pinSalt = hmac.Key;
                pinHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pin));
            }
        }

        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public void Delete(int Id)
        {
            var accout = _dbContext.Accounts.Find(Id);
            if(accout != null)
            {
                _dbContext.Accounts.Remove(accout);
                _dbContext.SaveChanges();
            }
        }

        public IEnumerable<Account> GetAllAccounts()
        {
            return _dbContext.Accounts.ToList();
        }

        public Account GetByAccountNumber(string AccountNumber)
        {
            var account = _dbContext.Accounts.Where(a => a.AccountNumberGenerated == AccountNumber).FirstOrDefault();
            if (account == null) return null;
            return account;
        }

        public Account GetById(int Id)
        {
            var account = _dbContext.Accounts.Where(a => a.Id == Id).FirstOrDefault();
            if(account == null) return null;
            return account;

        }

        public Account Update(Account account, string Pin = null, string Password = null)
        {
            var accountToUpdate = _dbContext.Accounts.Find(account.Id);
            if (accountToUpdate == null) throw new ApplicationException("Account does not exist.");
            if (!string.IsNullOrWhiteSpace(account.Email))
            {
                if (_dbContext.Accounts.Any(a => a.Email == account.Email)) throw new ApplicationException("This email already exists");
                accountToUpdate.Email = account.Email;
            }

            if (!string.IsNullOrWhiteSpace(account.PhoneNumber))
            {
                if (_dbContext.Accounts.Any(a => a.PhoneNumber == account.PhoneNumber)) throw new ApplicationException("This number already exists");
                accountToUpdate.PhoneNumber = account.PhoneNumber;
            }

            if (!string.IsNullOrWhiteSpace(Pin))
            {
                byte[] pinHash, pinSalt;
                CreatePinHash(Pin, out pinHash, out pinSalt);
                accountToUpdate.PinHash = pinHash;
                accountToUpdate.PinSalt = pinSalt;

            }

            if (!string.IsNullOrWhiteSpace(Password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePinHash(Pin, out passwordHash, out passwordSalt);
                accountToUpdate.PinHash = passwordHash;
                accountToUpdate.PinSalt = passwordSalt;

            }
            accountToUpdate.DateUpdated = DateTime.Now;
            _dbContext.Accounts.Update(accountToUpdate);
            _dbContext.SaveChanges();
            return accountToUpdate;
        }
    }
}
