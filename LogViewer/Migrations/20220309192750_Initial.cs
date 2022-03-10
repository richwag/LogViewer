using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogViewer.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Application",
                columns: table => new
                {
                    ApplicationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ApplicationName = table.Column<string>(type: "TEXT", unicode: false, maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Application", x => x.ApplicationId);
                });

            migrationBuilder.CreateTable(
                name: "MessageType",
                columns: table => new
                {
                    MessageTypeId = table.Column<short>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageType", x => x.MessageTypeId);
                });

            migrationBuilder.CreateTable(
                name: "LogEntry",
                columns: table => new
                {
                    LogId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ApplicationId = table.Column<int>(type: "INTEGER", nullable: false),
                    Message = table.Column<string>(type: "TEXT", nullable: false),
                    MessageTypeId = table.Column<short>(type: "INTEGER", nullable: false),
                    Host = table.Column<string>(type: "TEXT", unicode: false, maxLength: 100, nullable: false),
                    CurrentUserName = table.Column<string>(type: "TEXT", unicode: false, maxLength: 200, nullable: false),
                    FullErrorJson = table.Column<string>(type: "TEXT", unicode: false, nullable: true),
                    DateTime = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogEntry", x => x.LogId);
                    table.ForeignKey(
                        name: "FK_LogEntry_Application",
                        column: x => x.ApplicationId,
                        principalTable: "Application",
                        principalColumn: "ApplicationId");
                    table.ForeignKey(
                        name: "FK_LogEntry_MessageType",
                        column: x => x.MessageTypeId,
                        principalTable: "MessageType",
                        principalColumn: "MessageTypeId");
                });

            migrationBuilder.InsertData(
                table: "Application",
                columns: new[] { "ApplicationId", "ApplicationName" },
                values: new object[] { 1, "Application 1" });

            migrationBuilder.InsertData(
                table: "Application",
                columns: new[] { "ApplicationId", "ApplicationName" },
                values: new object[] { 2, "Application 2" });

            migrationBuilder.InsertData(
                table: "MessageType",
                columns: new[] { "MessageTypeId", "Name" },
                values: new object[] { (short)1, "Error" });

            migrationBuilder.InsertData(
                table: "MessageType",
                columns: new[] { "MessageTypeId", "Name" },
                values: new object[] { (short)2, "Information" });

            migrationBuilder.InsertData(
                table: "MessageType",
                columns: new[] { "MessageTypeId", "Name" },
                values: new object[] { (short)3, "Warning" });

            migrationBuilder.InsertData(
                table: "MessageType",
                columns: new[] { "MessageTypeId", "Name" },
                values: new object[] { (short)4, "Debug" });

            migrationBuilder.InsertData(
                table: "LogEntry",
                columns: new[] { "LogId", "ApplicationId", "CurrentUserName", "DateTime", "FullErrorJson", "Host", "Message", "MessageTypeId" },
                values: new object[] { new Guid("80ffd27a-23ee-4295-bc8e-14e33d8400ee"), 2, "Foo", 637824508703744235L, null, "Host", "Some debug information", (short)4 });

            migrationBuilder.InsertData(
                table: "LogEntry",
                columns: new[] { "LogId", "ApplicationId", "CurrentUserName", "DateTime", "FullErrorJson", "Host", "Message", "MessageTypeId" },
                values: new object[] { new Guid("cc7b75b9-4b29-425c-9252-c376d7786054"), 1, "Foo", 637824508703744227L, "{\"Name\": \"name\", \"Value\": \"value\"}", "Host", "Exception", (short)1 });

            migrationBuilder.InsertData(
                table: "LogEntry",
                columns: new[] { "LogId", "ApplicationId", "CurrentUserName", "DateTime", "FullErrorJson", "Host", "Message", "MessageTypeId" },
                values: new object[] { new Guid("db8b6364-00f0-4d6d-b975-79eca5acb564"), 2, "Foo", 637824508703744232L, null, "Host", "Good Morning", (short)2 });

            migrationBuilder.InsertData(
                table: "LogEntry",
                columns: new[] { "LogId", "ApplicationId", "CurrentUserName", "DateTime", "FullErrorJson", "Host", "Message", "MessageTypeId" },
                values: new object[] { new Guid("f595a444-c4f4-49ea-87d2-884b23757091"), 1, "Foo", 637824508703744234L, null, "Host", "Warning", (short)3 });

            migrationBuilder.CreateIndex(
                name: "IX_LogEntry_ApplicationId",
                table: "LogEntry",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_LogEntry_MessageTypeId",
                table: "LogEntry",
                column: "MessageTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogEntry");

            migrationBuilder.DropTable(
                name: "Application");

            migrationBuilder.DropTable(
                name: "MessageType");
        }
    }
}
