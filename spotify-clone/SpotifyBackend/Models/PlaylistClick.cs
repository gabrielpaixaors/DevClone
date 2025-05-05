namespace SpotifyBackend.Models
{
    public class PlaylistClick
    {
        public int Id { get; set; }
        public string PlaylistName { get; set; } = null!;
        public int Count { get; set; }
    }
}
