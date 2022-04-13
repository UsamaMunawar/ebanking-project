using System.ComponentModel.DataAnnotations;

namespace ebankingAPI.Models
{
    public class UpdateAccountModal
    {
        [Key]
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^[0-9]\d{5}$", ErrorMessage = "Pin must be 6-Digits")]
        public string Pin { get; set; }
        [Required]
        [Compare("Pin", ErrorMessage = "Pin must match with Confirm Pin")]
        public string ConfirmPin { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Password must match with Confirm Pin")]
        public string ConfirmPassword { get; set; }

        public DateTime DateUpdated { get; set; }

    }
}
