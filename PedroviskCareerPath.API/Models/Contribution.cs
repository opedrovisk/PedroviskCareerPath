namespace PedroviskCareerPath.API.Models;

public enum ContributionStatus
{
    InProgress,
    Completed,
}

public class Contribution
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public ContributionStatus Status { get; set; }
    public string? Url { get; set; }
    public string Tags { get; set; } = string.Empty;
    public string Impacts { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public int Order { get; set; }
}