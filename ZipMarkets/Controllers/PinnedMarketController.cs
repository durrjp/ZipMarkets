using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZipMarkets.Data;
using ZipMarkets.Models;
using ZipMarkets.Repositories;

namespace ZipMarkets.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PinnedMarketController : ControllerBase
    {
        private readonly PinnedMarketRepository _pmRepo;

        public PinnedMarketController(ApplicationDbContext context)
        {
            _pmRepo = new PinnedMarketRepository(context);
        }

        [HttpPost]
        public IActionResult Post(PinnedMarket pm)
        {
            _pmRepo.Add(pm);
            return CreatedAtAction("Get", new { id = pm.Id }, pm);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _pmRepo.Delete(id);
            return NoContent();
        }
    }
}
