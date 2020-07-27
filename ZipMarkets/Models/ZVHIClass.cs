using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class ZVHIClass
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Value { get; set; }
        public int ZipCodeId { get; set; }
        public Zip Zip { get; set; }
    }
}
