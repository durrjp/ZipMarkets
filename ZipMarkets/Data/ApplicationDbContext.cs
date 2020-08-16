using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZipMarkets.Models;

namespace ZipMarkets.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<HPIClass> AllHPIs { get; set; }
        public DbSet<Zip> AllZips { get; set; }
        public DbSet<ZVHIClass> AllZVHIs { get; set; }
        public DbSet<MessageCategory> MessageCategory { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<PinnedMarket> PinnedMarkets { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MortgageRate> MortgageRate { get; set; }

    }
}
