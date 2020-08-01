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
    public class MessageController : ControllerBase
    {
        private readonly MessageRepository _messageRepo;

        public MessageController(ApplicationDbContext context)
        {
            _messageRepo = new MessageRepository(context);
        }

        [HttpPost]
        public IActionResult Post(Message mess)
        {
            _messageRepo.Add(mess);
            return CreatedAtAction("Get", new { id = mess.Id }, mess);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepo.Delete(id);
            return NoContent();
        }
    }
}
