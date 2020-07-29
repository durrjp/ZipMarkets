using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZipMarkets.Data;
using ZipMarkets.Repositories;

namespace ZipMarkets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZipController : ControllerBase
    {
        private readonly ZipRepository _zipRepository;
        public ZipController(ApplicationDbContext context)
        {
            _zipRepository = new ZipRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_zipRepository.GetAll());
        }

    }
}
