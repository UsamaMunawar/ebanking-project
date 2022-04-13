using ebankingAPI.AppContexts;
using ebankingAPI.Models;
using ebankingAPI.Utils;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ebankingAPI.Services.Interfaces
{
    public class TransactionService : ITransactionService
    {
        private EBankingDBContext _dbContext;
        ILogger<TransactionService> _logger;
        private AppSettings _appSettings;
        private static string _ebankingSettlementAccount;
        private readonly IAccountService _accountService;
        private readonly ICurrencyService _currencyService;


        public TransactionService(EBankingDBContext eBankingDBContext, ILogger<TransactionService> logger, IOptions<AppSettings> appSettings, IAccountService accountService, ICurrencyService currencyService)
        {
            _dbContext = eBankingDBContext;
            _logger = logger;
            _appSettings = appSettings.Value;
            _ebankingSettlementAccount = _appSettings.EBankingSettlementAccount;
            _accountService = accountService;
            _currencyService = currencyService;
        }


        public Response CreateNewTransaction(Transaction transaction)
        {
            Response response = new Response();
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();
            response.ResponseCode = "00";
            response.ResponseMessage = "Transactin Successfull";
            response.Data = null;

            return response;
        }

        public Response FindTransactionByDate(DateTime date)
        {
            Response response = new Response();
            var transaction = _dbContext.Transactions.Where(t => t.TransactionDate == date).ToList();
            response.ResponseCode = "00";
            response.ResponseMessage = "";
            response.Data=transaction;

            return response;
        }

        public Response MakeDeposit(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            Response response = new Response();
            Account sourceAccount;
            Account destinationAccount;
            Transaction transaction = new Transaction();
            Currency currency = new Currency();
            var authenticateUser = _accountService.AuthenticateByAccountNumber(AccountNumber, TransactionPin);
            if (authenticateUser == null) throw new ApplicationException("Invalid Credentials");

            try
            {
                currency = _currencyService.GetByShortName(TransactionCurrency);
                sourceAccount = _accountService.GetByAccountNumber(_ebankingSettlementAccount);
                destinationAccount = _accountService.GetByAccountNumber(AccountNumber);

                sourceAccount.CurrentAccountBalance -= Math.Round(Ammount / currency.ConversionRate);
                destinationAccount.CurrentAccountBalance += Math.Round(Ammount / currency.ConversionRate);
                if(_dbContext.Entry(sourceAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified &&
                        _dbContext.Entry(destinationAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified)
                {
                    transaction.TransactionStatus = TStatus.Success;
                    response.ResponseCode = "00";
                    response.ResponseMessage = "Transaction Successfull";
                    response.Data = null;
                } else
                {
                    transaction.TransactionStatus = TStatus.Failure;
                    response.ResponseCode = "02";
                    response.ResponseMessage = "Transaction Failed. Something Went Wronge!";
                    response.Data = null;
                }
            } catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wronge...!");
            }

            transaction.TransactionType = TType.Deposit;
            transaction.TransactionSourceAccount = _ebankingSettlementAccount;
            transaction.TransactionDestination = AccountNumber;
            transaction.TransactionAmount = Ammount;
            transaction.TransactionDate = DateTime.Now;
            transaction.TransactionCurrency = TransactionCurrency;
            transaction.TransactionParticulars = $"{Ammount} Deposited from {JsonConvert.SerializeObject(transaction.TransactionSourceAccount)} to {JsonConvert.SerializeObject(transaction.TransactionDestination)} on {transaction.TransactionDate}";
            
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return response;
        }

        public Response MakeFundsTransfer(string FromAccount, string ToAccount, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            Response response = new Response();
            Account sourceAccount;
            Account destinationAccount;
            Transaction transaction = new Transaction();
            Currency currency = new Currency();
            var authenticateUser = _accountService.AuthenticateByAccountNumber(FromAccount, TransactionPin);
            if (authenticateUser == null) throw new ApplicationException("Invalid Credentials");

            try
            {
                currency = _currencyService.GetByShortName(TransactionCurrency);
                sourceAccount = _accountService.GetByAccountNumber(FromAccount);
                destinationAccount = _accountService.GetByAccountNumber(ToAccount);

                sourceAccount.CurrentAccountBalance -= Math.Round(Ammount/currency.ConversionRate);
                destinationAccount.CurrentAccountBalance += Math.Round(Ammount / currency.ConversionRate);
                if (_dbContext.Entry(sourceAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified &&
                        _dbContext.Entry(destinationAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified)
                {
                    transaction.TransactionStatus = TStatus.Success;
                    response.ResponseCode = "00";
                    response.ResponseMessage = "Transaction Successfull";
                    response.Data = null;
                }
                else
                {
                    transaction.TransactionStatus = TStatus.Failure;
                    response.ResponseCode = "02";
                    response.ResponseMessage = "Transaction Failed. Something Went Wronge!";
                    response.Data = null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wronge...!");
            }

            transaction.TransactionType = TType.Transfer;
            transaction.TransactionSourceAccount = FromAccount;
            transaction.TransactionDestination = ToAccount;
            transaction.TransactionAmount = Ammount;
            transaction.TransactionDate = DateTime.Now;
            transaction.TransactionCurrency = TransactionCurrency;
            transaction.TransactionParticulars = $"{Ammount} Transfered from {JsonConvert.SerializeObject(transaction.TransactionSourceAccount)} to {JsonConvert.SerializeObject(transaction.TransactionDestination)} on {transaction.TransactionDate}. Transaction Type: {transaction.TransactionType}";

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return response;
        }

        public Response MakeWithdrawl(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            Response response = new Response();
            Account sourceAccount;
            Account destinationAccount;
            Transaction transaction = new Transaction();
            Currency currency = new Currency();
            var authenticateUser = _accountService.AuthenticateByAccountNumber(AccountNumber, TransactionPin);
            if (authenticateUser == null) throw new ApplicationException("Invalid Credentials");

            try
            {
                sourceAccount = _accountService.GetByAccountNumber(AccountNumber);
                destinationAccount = _accountService.GetByAccountNumber(_ebankingSettlementAccount);

                sourceAccount.CurrentAccountBalance -= Math.Round(Ammount / currency.ConversionRate);
                destinationAccount.CurrentAccountBalance += Math.Round(Ammount / currency.ConversionRate);
                if (_dbContext.Entry(sourceAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified &&
                        _dbContext.Entry(destinationAccount).State == Microsoft.EntityFrameworkCore.EntityState.Modified)
                {
                    transaction.TransactionStatus = TStatus.Success;
                    response.ResponseCode = "00";
                    response.ResponseMessage = "Transaction Successfull";
                    response.Data = null;
                }
                else
                {
                    transaction.TransactionStatus = TStatus.Failure;
                    response.ResponseCode = "02";
                    response.ResponseMessage = "Transaction Failed. Something Went Wronge!";
                    response.Data = null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wronge...!");
            }

            transaction.TransactionType = TType.Withdrawl;
            transaction.TransactionSourceAccount = AccountNumber;
            transaction.TransactionDestination = _ebankingSettlementAccount;
            transaction.TransactionAmount = Ammount;
            transaction.TransactionDate = DateTime.Now;
            transaction.TransactionCurrency = TransactionCurrency;
            transaction.TransactionParticulars = $"{Ammount} Transfered from {JsonConvert.SerializeObject(transaction.TransactionSourceAccount)} to {JsonConvert.SerializeObject(transaction.TransactionDestination)} on {transaction.TransactionDate}. Transaction Type: {transaction.TransactionType}";

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return response;
        }
    }
}
