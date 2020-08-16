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
    public class MortgageRateController : ControllerBase
    {
        private readonly MortgageRateRepository _mrRepo;

        public MortgageRateController(ApplicationDbContext context)
        {
            _mrRepo = new MortgageRateRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_mrRepo.GetAll());
        }
    }
}
