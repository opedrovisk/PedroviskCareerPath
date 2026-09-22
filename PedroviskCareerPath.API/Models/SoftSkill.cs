namespace PedroviskCareerPath.API.Models;

public enum SoftSkillStatus
{
    Practicing,
    Developing,
}

public class SoftSkill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public SoftSkillStatus Status { get; set; }
    public int Order { get; set; }
}