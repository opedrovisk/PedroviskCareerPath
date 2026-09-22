using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PedroviskCareerPath.API.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderToSoftSkill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Level",
                table: "SoftSkills",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SoftSkills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "SoftSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SoftSkills");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "SoftSkills");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "SoftSkills",
                newName: "Level");
        }
    }
}
