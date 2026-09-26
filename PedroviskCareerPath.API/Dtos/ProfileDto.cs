using System.ComponentModel.DataAnnotations;

namespace PedroviskCareerPath.API.Dtos;

public class ProfileDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Subtitle { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Company { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Area { get; set; } = string.Empty;

    [MaxLength(300)]
    public string GithubUrl { get; set; } = string.Empty;

    [MaxLength(300)]
    public string LinkedinUrl { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Email { get; set; }

    [MaxLength(300)]
    public string? TwitterUrl { get; set; }

    [MaxLength(300)]
    public string? InstagramUrl { get; set; }

    [MaxLength(300)]
    public string? WebsiteUrl { get; set; }

    [MaxLength(1000)]
    public string TechStack { get; set; } = string.Empty;

    [Required]
    public DateTime PdiStartDate { get; set; }

    [Required]
    public DateTime PdiEndDate { get; set; }

    [MaxLength(1000)]
    public string Bio { get; set; } = string.Empty;

    [Required]
    public DateTime LastUpdate { get; set; }
}
