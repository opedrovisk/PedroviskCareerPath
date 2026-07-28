using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
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

    [HttpPost]
    public async Task<ActionResult<Profile>> Create(Profile profile)
    {
        _context.Profiles.Add(profile);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = profile.Id }, profile);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Profile profile)
    {
        if (id != profile.Id) return BadRequest();
        _context.Entry(profile).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var profile = await _context.Profiles.FindAsync(id);
        if (profile == null) return NotFound();
        _context.Profiles.Remove(profile);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}