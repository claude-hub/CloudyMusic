using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Service.Service;
using Service.DTOs;
using Service.Extension;

namespace Service.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        UserService _userService = new UserService();

        [HttpGet]
        [Authorize]
        public UserInfoDTO GetUser()
        {
            string token = Request.Headers["Authorization"].ToString();
            var userEmail = ExtensionMethods.GetEmployeeUserObject(token).Email;
            var user = _userService.GetUser(userEmail);
            var userInfo = new UserInfoDTO()
            {
                CreateTime = user.CreateTime.ToString(),
                Email = user.Email,
                Nickname = user.Nickname,
            };
            return userInfo;
        }
        public string Get()
        {
            return "123";
        }
    }
}