namespace PedroviskCareerPath.API.Models;

public enum GoalStatus
{
    Planejado,
    EmProgresso,
    Concluido,
}

public enum GoalPriority
{
    Baixa,
    Media,
    Alta,
}

public class Goal
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public GoalPriority Priority { get; set; }
    public GoalStatus Status { get; set; }
    public int ProgressPercent { get; set; }
    public DateTime? TargetDate { get; set; }
}