using System.ComponentModel.DataAnnotations;

namespace ebankingAPI.Models
{
    public class ACNumberAuthenticateModel
    {
        [Required]
        [RegularExpression(@"^[0][1-9]\d{10}$|^[1-9]\d{9}$")]
        public string AccountNumber { get; set; }
        [Required]
        public string Pin { get; set; }
    }
}
