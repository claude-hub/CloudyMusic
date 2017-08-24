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
        public async Task Token(string userName, string password)
        {
            var context = HttpContext;
            var userClaims = await GetTokenClaims(userName, password);
            if (userClaims == null)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(JsonConvert.SerializeObject("账号或密码错误!"));
                return;
            }
            var audienceConfig = _configuration.GetSection("TokenAuthentication:Audience").Value;
            var symmetricKeyAsBase64 = _configuration.GetSection("TokenAuthentication:SecretKey").Value;
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);
            var jwtToken = new JwtSecurityToken(
                issuer: audienceConfig,
                audience: audienceConfig,
                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: new SigningCredentials(
                    signingKey,
                    SecurityAlgorithms.HmacSha256)
               );
            var response = new 
            {
                IsSuccess = true,
                Data = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                }
            };
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            }));
        }
        private async Task<IEnumerable<Claim>> GetTokenClaims(string userName, string password)
        {
            if (userName == "1" && password == "1")
                return new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, userName)
                    };
            return null;
        }
        [Authorize]
        public async Task<JsonResult> Values()
        {
            return Json(new List<string> { "values1", "values2" });
        }
        public string Test()
        {
            return "124";
        }
    }
}