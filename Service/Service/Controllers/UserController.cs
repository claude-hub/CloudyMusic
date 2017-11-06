using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Service.Authorization.Middlewares;

namespace Service.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("any")]
    public class UserController : Controller
    {
        public IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        public async Task Login(string userName, string password)
        {
            var context = HttpContext;
            AuthMiddleware authMiddleware = new AuthMiddleware(_configuration);
            await authMiddleware.Token(context, userName, password);
        }
        [Authorize]
        [HttpGet]
        public JsonResult Values()
        {
            string token = Request.Headers["Authorization"].ToString();

            return Json(new List<string> { "values1", "values2" });
        }
        [HttpGet]
        public string Test()
        {
            return "124";
        }
    }
}