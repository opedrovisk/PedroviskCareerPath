using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PedroviskCareerPath.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AdminAuthOptions _options;

    public AuthController(IOptions<AdminAuthOptions> options)
    {
        _options = options.Value;
    }

    [HttpPost("login")]
    [EnableRateLimiting("login")]
    public ActionResult<LoginResponse> Login(LoginRequest request)
    {
        bool senhaValida = BCrypt.Net.BCrypt.Verify(request.Password, _options.PasswordHash);

        if (!senhaValida)
            return Unauthorized(new { message = "Senha inválida" });

        var expiresAt = DateTime.UtcNow.AddHours(8);

        var claims = new[]
        {
            new Claim(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.JwtSecret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _options.JwtIssuer,
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds
        );

        return new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt
        };
    }
}
