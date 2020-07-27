using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class HPIClass
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public decimal HPI { get; set; }
        public int ZipCodeId { get; set; }
        public Zip Zip { get; set; }
    }
}
