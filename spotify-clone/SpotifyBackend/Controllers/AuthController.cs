using Microsoft.AspNetCore.Mvc;
using SpotifyBackend.Data;
using System.Linq;

namespace SpotifyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AuthController(AppDbContext db) => _db = db;

        [HttpPost("login")]
        public IActionResult Login([FromBody] User creds)
        {
            // Só aceita "Dev" sem checar senha de verdade
            if (creds.Username == "Dev" && creds.Password == "dev")
                return Ok(new { username = "Dev" });

            return Unauthorized();
        }
    }
}
