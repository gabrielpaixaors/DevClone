
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using SpotifyBackend.Models;


namespace SpotifyBackend.Data
{
    public class AppDbContextFactory 
        : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var opts = new DbContextOptionsBuilder<AppDbContext>();
            opts.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=SpotifyCloneDb;Trusted_Connection=True;");
            return new AppDbContext(opts.Options);
        }
    }
}
