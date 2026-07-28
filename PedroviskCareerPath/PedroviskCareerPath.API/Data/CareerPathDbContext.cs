using Microsoft.EntityFrameworkCore;
using PedroviskCareerPath.API.Models;

namespace PedroviskCareerPath.API.Data;

public class CareerPathDbContext : DbContext
{
    public CareerPathDbContext(DbContextOptions<CareerPathDbContext> options)
        : base(options) { }

    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<Goal> Goals => Set<Goal>();
    public DbSet<RoadmapItem> RoadmapItems => Set<RoadmapItem>();
    public DbSet<Contribution> Contributions => Set<Contribution>();
    public DbSet<SoftSkill> SoftSkills => Set<SoftSkill>();
}
