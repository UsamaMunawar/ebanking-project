using ebankingAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace ebankingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private ICurrencyService _currencyService;

        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }

        [HttpGet]
        [Route("/all_currencies")]
        public IActionResult GetAllAccounts()
        {
            var currencies = _currencyService.GetAllCurrencies();
            return Ok(currencies);
        }

        [HttpGet]
        [Route("get_by_id")]
        public IActionResult GetByAccountID(int Id)
        {
            var account = _currencyService.GetById(Id);
            return Ok(account);
        }

        [HttpGet]
        [Route("get_by_shortname")]
        public IActionResult GetByShortName(string shortName)
        {
            if (!Regex.IsMatch(shortName, @"^([a-zA-Z]){3}$")) return BadRequest("Invalid Currency Short Name");
            var currency = _currencyService.GetByShortName(shortName);
            return Ok(currency);
        }
    }
}
