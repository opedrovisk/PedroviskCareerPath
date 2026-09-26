using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Dtos;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly CareerPathDbContext _context;

    public ProfileController(CareerPathDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Profile>>> GetAll()
    {
        return await _context.Profiles.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Profile>> GetById(int id)
    {
        var profile = await _context.Profiles.FindAsync(id);
        if (profile == null) return NotFound();
        return profile;
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, ProfileDto dto)
    {
        var profile = await _context.Profiles.FindAsync(id);
        if (profile == null) return NotFound();

        profile.Name = dto.Name;
        profile.Title = dto.Title;
        profile.Subtitle = dto.Subtitle;
        profile.Company = dto.Company;
        profile.Area = dto.Area;
        profile.GithubUrl = dto.GithubUrl;
        profile.LinkedinUrl = dto.LinkedinUrl;
        profile.Email = dto.Email;
        profile.TwitterUrl = dto.TwitterUrl;
        profile.InstagramUrl = dto.InstagramUrl;
        profile.WebsiteUrl = dto.WebsiteUrl;
        profile.TechStack = dto.TechStack;
        profile.PdiStartDate = dto.PdiStartDate;
        profile.PdiEndDate = dto.PdiEndDate;
        profile.Bio = dto.Bio;
        profile.LastUpdate = dto.LastUpdate;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
