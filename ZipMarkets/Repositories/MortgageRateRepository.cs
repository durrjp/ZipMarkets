using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;

namespace ZipMarkets.Repositories
{
    public class MortgageRateRepository
    {
        private readonly ApplicationDbContext _context;

        public MortgageRateRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<MortgageRate> GetAll()
        {
            return _context.MortgageRate
                .ToList();
        }
    }
}
