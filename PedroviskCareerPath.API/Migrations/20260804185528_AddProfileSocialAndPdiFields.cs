using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PedroviskCareerPath.API.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileSocialAndPdiFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstagramUrl",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PdiEndDate",
                table: "Profiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "PdiStartDate",
                table: "Profiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TechStack",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TwitterUrl",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebsiteUrl",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "InstagramUrl",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "PdiEndDate",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "PdiStartDate",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "TechStack",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "TwitterUrl",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "WebsiteUrl",
                table: "Profiles");
        }
    }
}
