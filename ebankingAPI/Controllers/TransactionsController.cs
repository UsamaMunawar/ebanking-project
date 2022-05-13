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
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private IMapper _mapper;


        public TransactionsController(ITransactionService transactionService, IMapper mapper)
        {
            _transactionService = transactionService;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("new_transaction")]

        public IActionResult NewTransaction([FromBody] RequestTransactionModel model)
        {
            if (!ModelState.IsValid) {
                return BadRequest(model);
            }
            var transaction = _mapper.Map<Transaction>(model);
            return Ok(_transactionService.CreateNewTransaction(transaction));
        }

        [HttpPost]
        [Route("deposit")]
        public IActionResult Deposit(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            if(!Regex.IsMatch(AccountNumber, @"^[0][1-9]\d{10}$|^[1-9]\d{9}$"))
            {
                return BadRequest("Invalid Account Number, Account Number must have 10-Digits");
            }
            return Ok(_transactionService.MakeDeposit(AccountNumber, Ammount, TransactionPin, TransactionCurrency));
        }

        [HttpPost]
        [Route("withdrawl")]
        public IActionResult Withdrawl(string AccountNumber, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            if (!Regex.IsMatch(AccountNumber, @"^[0][1-9]\d{10}$|^[1-9]\d{9}$"))
            {
                return BadRequest("Invalid Account Number, Account Number must have 10-Digits");
            }
            return Ok(_transactionService.MakeWithdrawl(AccountNumber, Ammount, TransactionPin, TransactionCurrency));
        }

        [HttpPost]
        [Route("transfer-funds")]
        public IActionResult Transfer(string FromAccount, string ToAccount, decimal Ammount, string TransactionPin, string TransactionCurrency)
        {
            if (!Regex.IsMatch(FromAccount, @"^[0][1-9]\d{10}$|^[1-9]\d{9}$") || !Regex.IsMatch(ToAccount, @"^[0][1-9]\d{10}$|^[1-9]\d{9}$"))
            {
                return BadRequest("Invalid Account Number. Account Number must be 10-Digits");
            }

            return Ok(_transactionService.MakeFundsTransfer(FromAccount, ToAccount, Ammount, TransactionPin, TransactionCurrency));
        }

        [HttpGet]
        [Route("/all_transactions")]
        public IActionResult GetAllAccounts()
        {
            var transactions = _transactionService.GetAllTransactions();
            return Ok(transactions);
        }


    }
}
