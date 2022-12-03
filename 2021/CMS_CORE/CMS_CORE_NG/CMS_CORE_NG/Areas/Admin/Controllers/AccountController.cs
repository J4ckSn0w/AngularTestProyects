using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace CMS_CORE_NG.Areas.Admin.Controllers
{
    [Area("Admin")]//Especificamos el area al que pertenecen
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
