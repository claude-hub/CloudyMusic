using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace Service.Controllers
{
    /// <summary>
    /// π‹¿Ì‘±
    /// </summary>
    [EnableCors("any")]
    [Route("api/[controller]/[action]")]
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}