using AutoMapper;
using ebankingAPI.Models;
using ebankingAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace ebankingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private IAccountService _accountService;
        IMapper _mapper;

        public AccountsController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;

        }

        [HttpPost]
        [Route("/register_account")]
        public IActionResult RegisterNewAccount([FromBody] RegisterNewAccountModel newAccount)
        {
            var account = _mapper.Map<Account>(newAccount);
            return Ok(_accountService.Create(account, newAccount.Pin, newAccount.ConfirmPin, newAccount.Password, newAccount.ConfirmPassword));
        }
        [HttpGet]
        [Route("/all_accounts")]
        public IActionResult GetAllAccounts()
        {
            var accounts = _accountService.GetAllAccounts();
            var cleanedAccounts = _mapper.Map<IList<GetAccountModal>>(accounts);
            return Ok(cleanedAccounts);
        }

        [HttpPost]
        [Route("authenticate_by_acnumber")]
        public IActionResult ACNumberAuthenticate([FromBody] ACNumberAuthenticateModel acnumberAuthenticateModel)
        {
            if (!ModelState.IsValid) return BadRequest(acnumberAuthenticateModel);
            var authResult = _accountService.AuthenticateByAccountNumber(acnumberAuthenticateModel.AccountNumber, acnumberAuthenticateModel.Pin);
            if (authResult == null) return Unauthorized("Invalid Credentials");
            return Ok(authResult);
        }

        [HttpPost]
        [Route("authenticate_by_username")]
        public IActionResult UsernameAuthenticate([FromBody] UsernameAuthenticateModel usernameAuthenticateModel)
        {
            if (!ModelState.IsValid) return BadRequest(usernameAuthenticateModel);
            var authResult = _accountService.AuthenticateByUsername(usernameAuthenticateModel.Username, usernameAuthenticateModel.Password);
            if (authResult == null) return Unauthorized("Invalid Credentials");
            return Ok(authResult);
        }

        [HttpGet]
        [Route("get_by_account_number")]
        public IActionResult GetByAccountNumber(string accountNumber)
        {
            if (!Regex.IsMatch(accountNumber, @"^[0][1-9]\d{10}$|^[1-9]\d{9}$")) return BadRequest("Account Number must be 10-Digits");
            var account = _accountService.GetByAccountNumber(accountNumber);
            var mappedAccount = _mapper.Map<GetAccountModal>(account);
            return Ok(mappedAccount);
        }

        [HttpGet]
        [Route("get_by_account_id")]
        public IActionResult GetByAccountID(int Id)
        {
            var account = _accountService.GetById(Id);
            var mappedAccount = _mapper.Map<GetAccountModal>(account);
            return Ok(mappedAccount);
        }

        [HttpPut]
        [Route("update_account")]
        public IActionResult UpdateAccount([FromBody] UpdateAccountModal model)
        {
            if(!ModelState.IsValid) return BadRequest(model);
            
            var account = _mapper.Map<Account>(model);
            _accountService.Update(account, model.Pin.ToString(), model.Password.ToString());
            return Ok(_mapper.Map<Account>(account));
        }

    }
}
