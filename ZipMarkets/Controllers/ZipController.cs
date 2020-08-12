﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Permissions;
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

        [HttpGet("getbyprice/{prices}")]
        public IActionResult GetByPrice(string prices)
        {
            int[] priceArray = prices.Split(",").Select(Int32.Parse).ToArray();
            int minPrice = priceArray.First();
            int maxPrice = priceArray.Last();
            return Ok(_zipRepository.GetByPrice(minPrice, maxPrice));
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

        [AllowAnonymous]
        [HttpGet("getbyzip/{zipCode}")]
        public IActionResult GetByZip(int zipCode)
        {
            var zip = _zipRepository.GetByZipCode(zipCode);
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
