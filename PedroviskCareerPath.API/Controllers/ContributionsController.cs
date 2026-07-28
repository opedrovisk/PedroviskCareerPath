using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContributionsController : ControllerBase
{
    private readonly CareerPathDbContext _context;

    public ContributionsController(CareerPathDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contribution>>> GetAll()
    {
        return await _context.Contributions.OrderByDescending(c => c.Date).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Contribution>> GetById(int id)
    {
        var contribution = await _context.Contributions.FindAsync(id);
        if (contribution == null) return NotFound();
        return contribution;
    }

    [HttpPost]
    public async Task<ActionResult<Contribution>> Create(Contribution contribution)
    {
        _context.Contributions.Add(contribution);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = contribution.Id }, contribution);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Contribution contribution)
    {
        if (id != contribution.Id) return BadRequest();
        _context.Entry(contribution).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var contribution = await _context.Contributions.FindAsync(id);
        if (contribution == null) return NotFound();
        _context.Contributions.Remove(contribution);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}