using ebankingAPI.Models;

namespace ebankingAPI.Services
{
    public interface ITransactionService
    {
        Response CreateNewTransaction(Transaction transaction);
        Response FindTransactionByDate(DateTime date);
        Response MakeDeposit(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency);
        Response MakeWithdrawl(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency);

        Response MakeFundsTransfer(string FromAccount, string ToAccount, decimal Ammount, string TransactionPin, string TransactionCurrency);

    }
}
