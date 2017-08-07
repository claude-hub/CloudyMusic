using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Album
    {
        public Album()
        {
            Music = new HashSet<Music>();
        }

        public int AlbumId { get; set; }
        public string Name { get; set; }
        public string Intro { get; set; }

        public virtual ICollection<Music> Music { get; set; }
    }
}
