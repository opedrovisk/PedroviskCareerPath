namespace PedroviskCareerPath.API.Models;

public class RoadmapItem
{
    public int Id { get; set; }
    public string Technology { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty; // "planejado", "em andamento", "concluído"
    public int Order { get; set; }
}
