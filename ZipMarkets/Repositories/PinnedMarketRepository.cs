using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;

namespace ZipMarkets.Repositories
{
    public class PinnedMarketRepository
    {
        private readonly ApplicationDbContext _context;

        public PinnedMarketRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(PinnedMarket pm)
        {
            _context.Add(pm);
            _context.SaveChanges();
        }
        public PinnedMarket GetPMById(int id)
        {
            return _context.PinnedMarkets
                       .FirstOrDefault(pm => pm.Id == id);
        }
        public void Delete(int id)
        {
            var pm = GetPMById(id);
            _context.PinnedMarkets.Remove(pm);
            _context.SaveChanges();
        }
    }
}
