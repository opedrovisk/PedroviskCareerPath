using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PedroviskCareerPath.API.Migrations
{
    /// <inheritdoc />
    public partial class AddGoalDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Goals");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Goals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProgressPercent",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "ProgressPercent",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goals");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Goals",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
