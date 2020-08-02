using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ZipCodeId { get; set; }
        public Zip ZipCode { get; set; }
        public int CategoryId { get; set; }
        public MessageCategory Category { get; set; }
        public string Content { get; set; }
    }
}
