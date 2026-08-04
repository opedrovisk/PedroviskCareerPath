namespace PedroviskCareerPath.API.Models;

public class Profile
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string LinkedinUrl { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? TwitterUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? WebsiteUrl { get; set; }
    public string TechStack { get; set; } = string.Empty;
    public DateTime PdiStartDate { get; set; }
    public DateTime PdiEndDate { get; set; }
    public string Bio { get; set; } = string.Empty;
    public DateTime LastUpdate { get; set; }
}