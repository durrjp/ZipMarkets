using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class Zip
    {
        public int Id { get; set; }
        public int ZipCode { get; set; }
        public int StateId { get; set; }
        public State State { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public decimal ForecastYoYPctChange { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public List<HPIClass> ZipHPIs { get; set; }
        public List<ZVHIClass> ZipZVHIs { get; set; }
    }
}
