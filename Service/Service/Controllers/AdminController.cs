using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace Service.Controllers
{
    /// <summary>
    /// 管理员
    /// </summary>
    [EnableCors("any")]
    [Route("api/[controller]/[action]")]
    public class AdminController : Controller
    {
        /// <summary>
        /// 管理员登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public bool Login(string name, string password)
        {
            return true;
        }
        /// <summary>
        /// 找回密码
        /// </summary>
        /// <param name="email"></param>
        /// <param name="identifyCode"></param>
        /// <returns></returns>
        [HttpGet]
        public bool FindPassword(string email, string identifyCode)
        {
            return true;
        }
        /// <summary>
        /// 添加管理员
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwod"></param>
        /// <returns></returns>
        [HttpGet]
        public bool AddAdmin(string email, string passwod)
        {
            return true;
        }
    }
}