using System;
using System.Threading.Tasks;

namespace FunctionalService
{
    public interface IFunctionalSvc
    {
        Task CreateDefaultAdminUser();
        Task CreateDefaultUser();
    }
}
