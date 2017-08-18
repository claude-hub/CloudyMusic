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
    /// 管理员
    /// </summary>
    [EnableCors("any")]
    [Route("api/[controller]/[action]")]
    public class AdminController : Controller
    {
        private CloudyMusicContext _cmdb = new CloudyMusicContext();
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
        /// <summary>
        /// 获取管理员列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Admin> GetAllAdmin()
        {
            var admins = _cmdb.Admin.ToList();
            var admin = _cmdb.Admin.SingleOrDefault(item => item.UserId == 1);
            var user = admin.User;
            var users = _cmdb.User.SingleOrDefault(item => item.UserId == 1);
            var a =  users.Admin;
            return admins;
        }
    }
}