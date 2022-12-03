using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataService;
using FunctionalService;
using LogginService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;

namespace CMS_CORE_NG
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var context = services.GetRequiredService<ApplicationDbContext>();
                    var dbContext = services.GetRequiredService<DataProtectionKeysContext>();
                    var functionSvc = services.GetRequiredService<IFunctionalSvc>();

                    DbContextInitializer.initialize(dbContext,context,functionSvc).Wait();//Usamos wait para no hacer la funcion asincrona

                }catch(Exception ex)
                {
                    Log.Error("An error ocurred while seeding the database {Error} {StackTrace} {InnerException} {Source}",
                        ex.Message, ex.StackTrace, ex.InnerException, ex.Source);
                }
            }


            host.Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseSerilog((hostingContext, logginConfiguration) => logginConfiguration
                    .Enrich.FromLogContext()
                    .Enrich.WithProperty("Application","CMS_APP")
                    .Enrich.WithProperty("MachineName", Environment.MachineName)
                    .Enrich.WithProperty("CurrentManagedThreadId",Environment.CurrentManagedThreadId)
                    .Enrich.WithProperty("OSVersion",Environment.OSVersion)
                    .Enrich.WithProperty("Version",Environment.Version)
                    .Enrich.WithProperty("UserName",Environment.UserName)
                    .Enrich.WithProperty("ProcessId", Process.GetCurrentProcess().Id)
                    .Enrich.WithProperty("ProcessName", Process.GetCurrentProcess().ProcessName)
                    .WriteTo.Console(theme: CustomConsoleTheme.VisualStudioMacLight)
                    .WriteTo.File(formatter:new CustomTextFormatter(), Path.Combine(hostingContext.HostingEnvironment.ContentRootPath + $"{Path.DirectorySeparatorChar}.Logs{Path.DirectorySeparatorChar}",$"load_error_{DateTime.Now:yyyyMMdd}.txt"))
                    .ReadFrom.Configuration(hostingContext.Configuration)
                    );
                    webBuilder.UseStartup<Startup>();
                });
    }
}
