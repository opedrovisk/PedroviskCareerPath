using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoadmapController : ControllerBase
{
    private readonly CareerPathDbContext _context;

    public RoadmapController(CareerPathDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoadmapItem>>> GetAll()
    {
        return await _context.RoadmapItems.OrderBy(r => r.Order).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RoadmapItem>> GetById(int id)
    {
        var item = await _context.RoadmapItems.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<RoadmapItem>> Create(RoadmapItem item)
    {
        _context.RoadmapItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, RoadmapItem item)
    {
        if (id != item.Id) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.RoadmapItems.FindAsync(id);
        if (item == null) return NotFound();
        _context.RoadmapItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}