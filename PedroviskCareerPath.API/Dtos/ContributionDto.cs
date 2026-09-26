using System.ComponentModel.DataAnnotations;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Dtos;

public class ContributionDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    public ContributionStatus Status { get; set; }

    [MaxLength(500)]
    public string? Url { get; set; }

    [MaxLength(500)]
    public string Tags { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Impacts { get; set; } = string.Empty;

    [Required]
    public DateTime Date { get; set; }

    public int Order { get; set; }
}
