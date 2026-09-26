using System.ComponentModel.DataAnnotations;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Dtos;

public class GoalDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    public GoalPriority Priority { get; set; }

    public GoalStatus Status { get; set; }

    [Range(0, 100)]
    public int ProgressPercent { get; set; }

    public DateTime? TargetDate { get; set; }
}
