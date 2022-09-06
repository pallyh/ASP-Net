using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Intro.Migrations
{
    public partial class TopicDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ff4e0eca-2f32-4585-b308-031b06cd09ad"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedMoment",
                table: "Topics",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastArticleMoment",
                table: "Topics",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "LogMoment", "Login", "PassHash", "PassSalt", "RealName", "RegMoment" },
                values: new object[] { new Guid("1e99ea56-6c3f-41a4-abf4-47a05b6facf2"), "", "", null, "Admin", "", "", "Корневой администратор", new DateTime(2022, 8, 22, 18, 31, 25, 48, DateTimeKind.Local).AddTicks(2927) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1e99ea56-6c3f-41a4-abf4-47a05b6facf2"));

            migrationBuilder.DropColumn(
                name: "CreatedMoment",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "LastArticleMoment",
                table: "Topics");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "LogMoment", "Login", "PassHash", "PassSalt", "RealName", "RegMoment" },
                values: new object[] { new Guid("ff4e0eca-2f32-4585-b308-031b06cd09ad"), "", "", null, "Admin", "", "", "Корневой администратор", new DateTime(2022, 8, 17, 20, 43, 7, 542, DateTimeKind.Local).AddTicks(5055) });
        }
    }
}
