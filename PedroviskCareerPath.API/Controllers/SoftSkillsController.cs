using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Dtos;
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
        return await _context.SoftSkills.OrderBy(s => s.Order).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SoftSkill>> GetById(int id)
    {
        var skill = await _context.SoftSkills.FindAsync(id);
        if (skill == null) return NotFound();
        return skill;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SoftSkill>> Create(SoftSkillDto dto)
    {
        var skill = new SoftSkill
        {
            Name = dto.Name,
            Description = dto.Description,
            Status = dto.Status,
            Order = dto.Order,
        };

        _context.SoftSkills.Add(skill);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = skill.Id }, skill);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, SoftSkillDto dto)
    {
        var skill = await _context.SoftSkills.FindAsync(id);
        if (skill == null) return NotFound();

        skill.Name = dto.Name;
        skill.Description = dto.Description;
        skill.Status = dto.Status;
        skill.Order = dto.Order;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var skill = await _context.SoftSkills.FindAsync(id);
        if (skill == null) return NotFound();
        _context.SoftSkills.Remove(skill);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
