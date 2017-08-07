using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Music
    {
        public Music()
        {
            ToneQuality = new HashSet<ToneQuality>();
        }

        public int MusicId { get; set; }
        public int? AlbumId { get; set; }
        public string Name { get; set; }
        public string LyricUrl { get; set; }
        public string SingerName { get; set; }
        public string SingerPhoto { get; set; }
        public int Type { get; set; }

        public virtual ICollection<ToneQuality> ToneQuality { get; set; }
        public virtual Album Album { get; set; }
    }
}
