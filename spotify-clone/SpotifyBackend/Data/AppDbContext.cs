using Microsoft.EntityFrameworkCore;

namespace SpotifyBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) {}

        public DbSet<PlaylistClick> PlaylistClicks { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }

    public class PlaylistClick
    {
        public int Id { get; set; }
        public string PlaylistName { get; set; } = null!;  // inicializa com null-forgiving
        public int Count { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
