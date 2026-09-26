using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Data;
using PedroviskCareerPath.API.Dtos;
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
        return await _context.Contributions.OrderBy(c => c.Order).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Contribution>> GetById(int id)
    {
        var contribution = await _context.Contributions.FindAsync(id);
        if (contribution == null) return NotFound();
        return contribution;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Contribution>> Create(ContributionDto dto)
    {
        var contribution = new Contribution
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            Status = dto.Status,
            Url = dto.Url,
            Tags = dto.Tags,
            Impacts = dto.Impacts,
            Date = dto.Date,
            Order = dto.Order,
        };

        _context.Contributions.Add(contribution);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = contribution.Id }, contribution);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, ContributionDto dto)
    {
        var contribution = await _context.Contributions.FindAsync(id);
        if (contribution == null) return NotFound();

        contribution.Title = dto.Title;
        contribution.Description = dto.Description;
        contribution.Category = dto.Category;
        contribution.Status = dto.Status;
        contribution.Url = dto.Url;
        contribution.Tags = dto.Tags;
        contribution.Impacts = dto.Impacts;
        contribution.Date = dto.Date;
        contribution.Order = dto.Order;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var contribution = await _context.Contributions.FindAsync(id);
        if (contribution == null) return NotFound();
        _context.Contributions.Remove(contribution);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
