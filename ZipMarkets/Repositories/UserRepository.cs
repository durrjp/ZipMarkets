using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;

namespace ZipMarkets.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.Users
                       .Include(up => up.UserType)
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public List<User> GetAll()
        {
            return _context.Users
                .Include(up => up.UserType)
                .OrderBy(up => up.DisplayName)
                .ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users
                       .Include(up => up.UserType)
                       .FirstOrDefault(up => up.Id == id);
        }

        public void Add(User userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(User userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
