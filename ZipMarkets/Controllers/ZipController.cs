using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class ZipController : ControllerBase
    {
        private readonly ZipRepository _zipRepository;
        private readonly UserRepository _userRepo;
        public ZipController(ApplicationDbContext context)
        {
            _zipRepository = new ZipRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_zipRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var zip = _zipRepository.GetById(id);

            if (zip == null)
            {
                return NotFound();
            }
            return Ok(zip);
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
