using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class PinnedMarket
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ZipCodeId { get; set; }
        public Zip Zip { get; set; }
    }
}
