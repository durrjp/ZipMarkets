using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZipMarkets.Data;
using ZipMarkets.Repositories;

namespace ZipMarkets.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HPIDataController : ControllerBase
    {
        private readonly HPIRepository _hpiRepo;

        public HPIDataController(ApplicationDbContext context)
        {
            _hpiRepo = new HPIRepository(context);
        }

        [HttpGet]
        public IActionResult GetAvgHPIs()
        {
            return Ok(_hpiRepo.GetHPIAvgs());
        }
    }
}
