namespace PedroviskCareerPath.API.Models;

public class AdminAuthOptions
{
    public string PasswordHash { get; set; } = string.Empty;
    public string JwtSecret { get; set; } = string.Empty;
    public string JwtIssuer { get; set; } = string.Empty;
}