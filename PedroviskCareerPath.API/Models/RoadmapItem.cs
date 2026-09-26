namespace PedroviskCareerPath.API.Models;

public enum RoadmapStatus
{
    Planned,
    InProgress,
    Completed,
}

public class RoadmapItem
{
    public int Id { get; set; }
    public string Technology { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public RoadmapStatus Status { get; set; }
    public int Order { get; set; }
}