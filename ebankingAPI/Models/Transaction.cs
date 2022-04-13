using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ebankingAPI.Models
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string TransactionUniqueReference { get; set; }
        public decimal TransactionAmount { get; set; }
        public TStatus TransactionStatus { get; set; }
        public bool IsSuccessful => TransactionStatus.Equals(TStatus.Success);
        public string TransactionSourceAccount { get; set; }
        public string TransactionDestination { get; set; }
        public string TransactionParticulars { get; set; }
        public TType TransactionType { get; set; }
        public DateTime TransactionDate { get; set; }

        public Transaction()
        {
            TransactionUniqueReference = $"{Guid.NewGuid().ToString().Replace("-","").Substring(1, 27)}";
        }
    }

    public enum TStatus
    {
        Success,
        Failure,
        Error
    }

    public enum TType
    {
        Deposit,
        Withdrawl,
        Transfer
    }
}
