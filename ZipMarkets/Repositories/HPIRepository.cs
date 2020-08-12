using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models.ViewModels;

namespace ZipMarkets.Repositories
{
    public class HPIRepository
    {
        private readonly ApplicationDbContext _context;

        public HPIRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<HPIAvgViewModel> GetHPIAvgs()
        {
            return _context.AllHPIs
                            .GroupBy(hpi => hpi.Year)
                            .Select(g => new HPIAvgViewModel()
                            {
                                Year = g.Key,
                                Average = g.Average(h => h.HPI)
                            })
                            .OrderBy(h => h.Year)
                            .ToList();
        }
    }
}
