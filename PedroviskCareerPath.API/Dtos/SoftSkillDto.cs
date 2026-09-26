using System.ComponentModel.DataAnnotations;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Dtos;

public class SoftSkillDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public SoftSkillStatus Status { get; set; }

    public int Order { get; set; }
}
