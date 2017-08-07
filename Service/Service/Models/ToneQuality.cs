using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class ToneQuality
    {
        public int ToneQualityId { get; set; }
        public int MusicId { get; set; }
        public string Name { get; set; }
        public string MusicUrl { get; set; }

        public virtual Music Music { get; set; }
    }
}
