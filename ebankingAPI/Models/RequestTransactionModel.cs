namespace ebankingAPI.Models
{
    public class RequestTransactionModel
    {
        public decimal TransactionAmount { get; set; }
        public string TransactionSourceAccount { get; set; }
        public string TransactionDestination { get; set; }
        public TType TransactionType { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionCurrency { get; set; }
    }
}
