using System.ComponentModel.DataAnnotations;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Dtos;

public class RoadmapItemDto
{
    [Required, MaxLength(100)]
    public string Technology { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    public RoadmapStatus Status { get; set; }

    public int Order { get; set; }
}
