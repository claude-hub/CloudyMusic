using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Admin
    {
        public Admin()
        {
            UserPermissions = new HashSet<UserPermissions>();
            UserRoles = new HashSet<UserRoles>();
        }

        public int AdminId { get; set; }
        public int UserId { get; set; }

        public virtual ICollection<UserPermissions> UserPermissions { get; set; }
        public virtual ICollection<UserRoles> UserRoles { get; set; }
        public virtual User User { get; set; }
    }
}
