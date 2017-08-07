using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Permissions
    {
        public Permissions()
        {
            RolePermissions = new HashSet<RolePermissions>();
            UserPermissions = new HashSet<UserPermissions>();
        }

        public Guid PermissionId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime CreationTime { get; set; }

        public virtual ICollection<RolePermissions> RolePermissions { get; set; }
        public virtual ICollection<UserPermissions> UserPermissions { get; set; }
    }
}
