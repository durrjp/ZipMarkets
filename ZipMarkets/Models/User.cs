using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipMarkets.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int HomeZip { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
        public int MinHomePrice { get; set; }
        public int MaxHomePrice { get; set; }
    }
}
