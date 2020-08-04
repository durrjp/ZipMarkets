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
    public class ZVHIDataController : ControllerBase
    {
        private readonly ZVHIRepository _zvhiRepo;

        public ZVHIDataController(ApplicationDbContext context)
        {
            _zvhiRepo = new ZVHIRepository(context);
        }

        [HttpGet]
        public IActionResult GetAvgZVHIs()
        {
            return Ok(_zvhiRepo.GetZVHIAvgs());
        }
    }
}
