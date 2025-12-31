using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_service.Migrations
{
    /// <inheritdoc />
    public partial class CreateBusTableV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Buses",
                table: "Buses");

            migrationBuilder.DropColumn(
                name: "BusId",
                table: "Buses");

            migrationBuilder.DropColumn(
                name: "ArrivalTime",
                table: "Buses");

            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "Buses");

            migrationBuilder.RenameTable(
                name: "Buses",
                newName: "buses");

            migrationBuilder.RenameColumn(
                name: "TotalSeats",
                table: "buses",
                newName: "total_seats");

            migrationBuilder.RenameColumn(
                name: "BusNumber",
                table: "buses",
                newName: "bus_number");

            migrationBuilder.RenameColumn(
                name: "Source",
                table: "buses",
                newName: "bus_type");

            migrationBuilder.RenameColumn(
                name: "Destination",
                table: "buses",
                newName: "bus_name");

            migrationBuilder.AlterColumn<string>(
                name: "bus_number",
                table: "buses",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "buses",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_buses",
                table: "buses",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_buses_bus_number",
                table: "buses",
                column: "bus_number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_buses",
                table: "buses");

            migrationBuilder.DropIndex(
                name: "IX_buses_bus_number",
                table: "buses");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "buses");

            migrationBuilder.RenameTable(
                name: "buses",
                newName: "Buses");

            migrationBuilder.RenameColumn(
                name: "total_seats",
                table: "Buses",
                newName: "TotalSeats");

            migrationBuilder.RenameColumn(
                name: "bus_number",
                table: "Buses",
                newName: "BusNumber");

            migrationBuilder.RenameColumn(
                name: "bus_type",
                table: "Buses",
                newName: "Source");

            migrationBuilder.RenameColumn(
                name: "bus_name",
                table: "Buses",
                newName: "Destination");

            migrationBuilder.AlterColumn<string>(
                name: "BusNumber",
                table: "Buses",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "BusId",
                table: "Buses",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "ArrivalTime",
                table: "Buses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DepartureTime",
                table: "Buses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Buses",
                table: "Buses",
                column: "BusId");
        }
    }
}
