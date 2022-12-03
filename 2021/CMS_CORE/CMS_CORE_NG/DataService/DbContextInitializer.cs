using System;
using System.Linq;
using System.Threading.Tasks;
using FunctionalService;

namespace DataService
{
    public static class DbContextInitializer
    {
        public static async Task initialize(DataProtectionKeysContext dataProtectionKeysContext, ApplicationDbContext applicationDbContext, IFunctionalSvc functionalSvc)
        {
            // Chekc if contais any user. If db is not empty, then db has been already seed db DataProtectionKeysContext is created
            // Check if db ApplicationDbContext is created
            Console.WriteLine("ENTRE A ESTA PARTE");
            await dataProtectionKeysContext.Database.EnsureCreatedAsync();
            await applicationDbContext.Database.EnsureCreatedAsync();
            Console.WriteLine("AHORA ESTOY POR ACA");

            // Check if db contains any user. If db is not empty, then db has been already seeded

            if(applicationDbContext.ApplicationUsers.Any())
            {
                Console.WriteLine("ENTRE AL IF");
                return;
            }

            // if empty create Admin User and App User
            Console.WriteLine("Apunto de crear usuario y admin por que no estan en la DB");
            await functionalSvc.CreateDefaultAdminUser();
            await functionalSvc.CreateDefaultUser();
        }
    }
}
