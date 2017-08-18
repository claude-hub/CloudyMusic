using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Service
{
    /// <summary>
    /// 管理员逻辑代码
    /// </summary>
    public class AdminService
    {
        private CloudyMusicContext _ctx = new CloudyMusicContext();
        /// <summary>
        /// 获取所有管理员列表
        /// </summary>
        /// <returns></returns>
        private List<Admin> GetAllAdmin()
        {
            return _ctx.Admin.ToList();
        }
        /// <summary>
        /// 获取所有用户列表
        /// </summary>
        /// <returns></returns>
        private List<User> GetAllUser()
        {
            return _ctx.User.ToList();
        }
        /// <summary>
        /// 管理员登录
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        public void Login(string email,string password)
        {
            var users = GetAllUser();
            var user = users.SingleOrDefault(item => item.Email == email && item.Password == password);
            var admin = GetAllAdmin().SingleOrDefault(item => item.UserId == user.UserId);
            if (admin != null)
            {
                
            }
        }
    }
}
