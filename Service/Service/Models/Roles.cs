using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Roles
    {
        public Roles()
        {
            RolePermissions = new HashSet<RolePermissions>();
            UserRoles = new HashSet<UserRoles>();
        }

        public Guid RoleId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime CreationTime { get; set; }

        public virtual ICollection<RolePermissions> RolePermissions { get; set; }
        public virtual ICollection<UserRoles> UserRoles { get; set; }
    }
}
