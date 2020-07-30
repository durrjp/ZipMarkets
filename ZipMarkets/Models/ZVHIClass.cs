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
        public int Value { get; set; }
        public int ZipCodeId { get; set; }
        public Zip ZipCode { get; set; }
    }
}
