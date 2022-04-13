using AutoMapper;
using ebankingAPI.Models;

namespace ebankingAPI.Profiles
{
    public class AutoMappingProfile: Profile
    {
        public AutoMappingProfile()
        {
            CreateMap<RegisterNewAccountModel, Account>();

            CreateMap<UpdateAccountModal, Account>();
            CreateMap<Account, GetAccountModal>();
            CreateMap<RequestTransactionModel, Transaction>();
        }



    }
}
