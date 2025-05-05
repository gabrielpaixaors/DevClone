using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpotifyBackend.Data;
namespace SpotifyBackend.Controllers
{
    public class PlaylistCountDto { public required string Name { get; set; } public int Count { get; set; } }

    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public PlaylistsController(AppDbContext db) => _db = db;

        [HttpPost("click")]
        public async Task<IActionResult> Click([FromBody] PlaylistCountDto dto)
        {
            var entry = await _db.PlaylistClicks
                .FirstOrDefaultAsync(p => p.PlaylistName == dto.Name);

            if (entry == null)
            {
                entry = new PlaylistClick { PlaylistName = dto.Name, Count = 1 };
                _db.PlaylistClicks.Add(entry);
            }
            else
            {
                entry.Count++;
                _db.PlaylistClicks.Update(entry);
            }

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("top")]
        public async Task<PlaylistCountDto[]> Top([FromQuery] int n)
        {
            return await _db.PlaylistClicks
                .OrderByDescending(p => p.Count)
                .Take(n)
                .Select(p => new PlaylistCountDto { Name = p.PlaylistName, Count = p.Count })
                .ToArrayAsync();
        }

        [HttpGet("all")]
        public async Task<PlaylistCountDto[]> All()
        {
            return await _db.PlaylistClicks
                .Select(p => new PlaylistCountDto { Name = p.PlaylistName, Count = p.Count })
                .ToArrayAsync();
        }
    }
}
