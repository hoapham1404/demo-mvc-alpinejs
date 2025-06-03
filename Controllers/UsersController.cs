using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using UserManagementDemo.Data;
using UserManagementDemo.Models;

namespace UserManagementDemo.Controllers;

public class UsersController : Controller
{
    private readonly DapperContext _context;

    public UsersController(DapperContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        string query = @"
			SELECT *
			FROM Users
		";
        using System.Data.IDbConnection connection = _context.CreateConnection();
        System.Collections.Generic.IEnumerable<UserViewModel> users = await connection.QueryAsync<UserViewModel>(query);
        return View(users);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ExecCreateUser(UserViewModel model)
    {
        await Task.Delay(10000);
        var query = @"
			INSERT INTO Users (Username, Email)
			VALUES (@UserName, @Email)
		";
        using System.Data.IDbConnection connection = _context.CreateConnection();
        _ = await connection.ExecuteAsync(query, model);
        return Json(new { success = false });
    }
}
