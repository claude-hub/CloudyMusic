using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class User
    {
        public User()
        {
            Admin = new HashSet<Admin>();
        }

        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NickName { get; set; }
        public string Head { get; set; }
        public string PhoneNum { get; set; }

        public virtual ICollection<Admin> Admin { get; set; }
    }
}
