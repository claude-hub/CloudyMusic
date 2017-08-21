using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Interface
{
    /// <summary>
    /// user接口
    /// </summary>
    public interface IUser
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        User Login(string email, string password);
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        User GetUserInfo(string userEmail);
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="nickname"></param>
        /// <returns></returns>
        User UserRegister(string email, string password, string nickname);
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="userEmail"></param>
        /// <param name="oldPassword"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        bool ModifyPassword(string userEmail, string oldPassword, string newPassword);
        /// <summary>
        /// 修改个人信息
        /// </summary>
        /// <param name="userEmail"></param>
        /// <param name="nickname"></param>
        /// <returns></returns>
        bool ModifyPersonalInformation(string userEmail, string nickname);

    }
}
