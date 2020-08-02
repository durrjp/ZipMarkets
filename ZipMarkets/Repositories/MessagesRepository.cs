using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Data;
using ZipMarkets.Models;

namespace ZipMarkets.Repositories
{
    public class MessagesRepository
    {
        private readonly ApplicationDbContext _context;

        public MessagesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(Message mess)
        {
            _context.Add(mess);
            _context.SaveChanges();
        }

        public Message GetMessageById(int id)
        {
            return _context.Messages
                       .FirstOrDefault(m => m.Id == id);
        }

        public void Delete(int id)
        {
            var mess = GetMessageById(id);
            _context.Messages.Remove(mess);
            _context.SaveChanges();
        }
    }
}
