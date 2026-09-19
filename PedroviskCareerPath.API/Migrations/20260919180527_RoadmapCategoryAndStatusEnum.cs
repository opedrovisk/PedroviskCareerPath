using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PedroviskCareerPath.API.Migrations
{
    /// <inheritdoc />
    public partial class RoadmapCategoryAndStatusEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "RoadmapItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql("""
        UPDATE RoadmapItems
        SET Status = CASE Status
            WHEN N'planejado' THEN '0'
            WHEN N'em andamento' THEN '1'
            WHEN N'concluído' THEN '2'
            WHEN N'concluido' THEN '2'
            ELSE '0'
        END
        """);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "RoadmapItems",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.Sql("""
        UPDATE RoadmapItems
        SET Category = CASE
            WHEN Technology IN (N'ASP.NET Core', N'Entity Framework Core') THEN N'Backend'
            WHEN Technology = N'Azure' THEN N'Cloud'
            ELSE N'Backend'
        END
        """);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "RoadmapItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.Sql("""
        UPDATE RoadmapItems
        SET Status = CASE Status
            WHEN '0' THEN N'planejado'
            WHEN '1' THEN N'em andamento'
            WHEN '2' THEN N'concluído'
        END
        """);

            migrationBuilder.DropColumn(
                name: "Category",
                table: "RoadmapItems");
        }
    }
}
