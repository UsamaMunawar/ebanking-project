using System.ComponentModel.DataAnnotations;

namespace ebankingAPI.Models
{
    public class UsernameAuthenticateModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
