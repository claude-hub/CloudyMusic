using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Service.Models;

namespace Service.Controllers
{
    /// <summary>
    /// ÓÃ»§
    /// </summary>
    [EnableCors("any")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        /// <summary>
        /// µÇÂ¼
        /// </summary>
        /// <param name="name"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        public bool Login(string name, string password)
        {
            return true;
        }
        /// <summary>
        /// ×¢²á
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<User> Register()
        {
            List<User> users = new List<User>()
            {
                new User(){
                    Email="q1231",
                    Password="1",
                    NickName="z",
                    PhoneNum="a",
                    UserId=1,
                },
                new User(){
                    Email="q1231",
                    Password="1",
                    NickName="z",
                    PhoneNum="a",
                    UserId=1,
                }
            };
            return users;
        }
        /// <summary>
        /// ²âÊÔ
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Test()
        {
            var result = new { name = "linfei", age = "26", address = "wuhan" };

            //MVCÖÐ·µ»Ø
            return Json(result);
        }
    }
}