using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;
using ZipMarkets.Models.ViewModels;

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

        public Zip GetById(int id)
        {
            return _context.AllZips
                            .Include(z => z.State)
                            .Include(z => z.HPIList)
                            .Include(z => z.ZVHIList)
                            .Include(z => z.MessageList)
                            .ThenInclude(m => m.Category)
                            .Where(z => z.Id == id)
                            .FirstOrDefault();
        }

        public Zip GetByZipCode(int zipCode)
        {
            return _context.AllZips
                           .Include(z => z.State)
                           .Where(z => z.ZipCode == zipCode)
                           .FirstOrDefault();
        }
    }
}
