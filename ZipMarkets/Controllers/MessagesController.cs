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
    public class MessagesController : ControllerBase
    {
        private readonly MessagesRepository _messageRepo;

        public MessagesController(ApplicationDbContext context)
        {
            _messageRepo = new MessagesRepository(context);
        }

        [HttpPost]
        public IActionResult Post(Message mess)
        {
            _messageRepo.Add(mess);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepo.Delete(id);
            return NoContent();
        }
    }
}
