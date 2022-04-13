using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ebankingAPI.Models
{
    [Table("Currency")]
    public class Currency
    {
        [Key]
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string Name { get; set; }
        public decimal ConversionRate { get; set; }
    }
}
