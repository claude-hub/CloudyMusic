using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class RolePermissions
    {
        public Guid RoleId { get; set; }
        public Guid PermissionId { get; set; }

        public virtual Permissions Permission { get; set; }
        public virtual Roles Role { get; set; }
    }
}
