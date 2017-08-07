using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class UserPermissions
    {
        public int AdminId { get; set; }
        public Guid PermissionId { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Permissions Permission { get; set; }
    }
}
