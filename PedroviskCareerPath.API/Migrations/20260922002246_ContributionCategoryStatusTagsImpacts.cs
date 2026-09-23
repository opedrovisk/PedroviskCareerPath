using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PedroviskCareerPath.API.Migrations
{
    /// <inheritdoc />
    public partial class ContributionCategoryStatusTagsImpacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Contributions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Contributions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Contributions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Impacts",
                table: "Contributions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Contributions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Category", table: "Contributions");
            migrationBuilder.DropColumn(name: "Status", table: "Contributions");
            migrationBuilder.DropColumn(name: "Tags", table: "Contributions");
            migrationBuilder.DropColumn(name: "Impacts", table: "Contributions");
            migrationBuilder.DropColumn(name: "Order", table: "Contributions");
        }
    }
}
