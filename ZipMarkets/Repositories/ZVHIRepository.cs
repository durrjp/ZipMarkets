using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models.ViewModels;

namespace ZipMarkets.Repositories
{
    public class ZVHIRepository
    {
        private readonly ApplicationDbContext _context;

        public ZVHIRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ZVHIAvgViewModel> GetZVHIAvgs()
        {
            return _context.AllZVHIs
                            .GroupBy(zvhi => zvhi.Date)
                            .Select(g => new ZVHIAvgViewModel()
                            {
                                Date = g.Key,
                                Average = g.Average(z => z.Value)
                            })
                            .OrderBy(z => z.Date)
                            .ToList();
        }
    }
}
