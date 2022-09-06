using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Intro.Migrations
{
    public partial class ArticleDeleteMoment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1e99ea56-6c3f-41a4-abf4-47a05b6facf2"));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteMoment",
                table: "Articles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "LogMoment", "Login", "PassHash", "PassSalt", "RealName", "RegMoment" },
                values: new object[] { new Guid("4e57e5be-060d-49c0-87a7-eb4ed1a3cbd6"), "", "", null, "Admin", "", "", "Корневой администратор", new DateTime(2022, 8, 26, 20, 21, 40, 298, DateTimeKind.Local).AddTicks(1965) });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_ReplyId",
                table: "Articles",
                column: "ReplyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Articles_ReplyId",
                table: "Articles",
                column: "ReplyId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Articles_ReplyId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_ReplyId",
                table: "Articles");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4e57e5be-060d-49c0-87a7-eb4ed1a3cbd6"));

            migrationBuilder.DropColumn(
                name: "DeleteMoment",
                table: "Articles");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "LogMoment", "Login", "PassHash", "PassSalt", "RealName", "RegMoment" },
                values: new object[] { new Guid("1e99ea56-6c3f-41a4-abf4-47a05b6facf2"), "", "", null, "Admin", "", "", "Корневой администратор", new DateTime(2022, 8, 22, 18, 31, 25, 48, DateTimeKind.Local).AddTicks(2927) });
        }
    }
}
