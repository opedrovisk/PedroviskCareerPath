using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GoalsController : ControllerBase
{
    private readonly CareerPathDbContext _context;

    public GoalsController(CareerPathDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Goal>>> GetAll()
    {
        return await _context.Goals.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Goal>> GetById(int id)
    {
        var goal = await _context.Goals.FindAsync(id);
        if (goal == null) return NotFound();
        return goal;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Goal>> Create(Goal goal)
    {
        _context.Goals.Add(goal);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = goal.Id }, goal);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, Goal goal)
    {
        if (id != goal.Id) return BadRequest();
        _context.Entry(goal).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var goal = await _context.Goals.FindAsync(id);
        if (goal == null) return NotFound();
        _context.Goals.Remove(goal);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}