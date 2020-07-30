using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;

namespace ZipMarkets.Repositories
{
    public class ZipRepository
    {
        private readonly ApplicationDbContext _context;

        public ZipRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Zip> GetAll()
        {
            return _context.AllZips
                .Include(z => z.State)
                .Where(z => z.Latitude != null && z.Longitude != null)
                .ToList();
        }
    }
}
