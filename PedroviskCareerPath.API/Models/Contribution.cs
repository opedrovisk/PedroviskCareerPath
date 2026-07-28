namespace PedroviskCareerPath.API.Models;

public class Contribution
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Url { get; set; }
    public DateTime Date { get; set; }
}
