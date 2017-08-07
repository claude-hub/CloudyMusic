using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class UserRoles
    {
        public int AdminId { get; set; }
        public Guid RoleId { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Roles Role { get; set; }
    }
}
