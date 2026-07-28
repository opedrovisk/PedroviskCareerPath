using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SoftSkillsController : ControllerBase
{
    private readonly CareerPathDbContext _context;

    public SoftSkillsController(CareerPathDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SoftSkill>>> GetAll()
    {
        return await _context.SoftSkills.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SoftSkill>> GetById(int id)
    {
        var skill = await _context.SoftSkills.FindAsync(id);
        if (skill == null) return NotFound();
        return skill;
    }

    [HttpPost]
    public async Task<ActionResult<SoftSkill>> Create(SoftSkill skill)
    {
        _context.SoftSkills.Add(skill);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = skill.Id }, skill);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, SoftSkill skill)
    {
        if (id != skill.Id) return BadRequest();
        _context.Entry(skill).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var skill = await _context.SoftSkills.FindAsync(id);
        if (skill == null) return NotFound();
        _context.SoftSkills.Remove(skill);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}