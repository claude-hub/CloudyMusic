using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Authorization.Middlewares
{
    public class AuthMiddleware
    {
        public IConfiguration _configuration;
        public AuthMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task Token(HttpContext context, string userName, string password)
        {
            var userClaims = GetTokenClaims(userName, password);
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
        private IEnumerable<Claim> GetTokenClaims(string userName, string password)
        {
            if (userName == "1" && password == "1")
                return new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, userName)
                    };
            return null;
        }
    }
}
