using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Service
{
    public class UserService
    {
         private User user = new User()
        {
            CreateTime = DateTime.Now,
            Email = "314705487@qq.com",
            Nickname = "Cloudy",
            Password = "123456",
        };
        public User Login(string email, string password)
        {

            if (user.Email == email && user.Password == password)
            {
                return user;
            }
            return null;
        }
        public User GetUser(string email)
        {
            return user;
        }
    }
}
