using System.Data;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace UserManagementDemo.Data;

public class DapperContext
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public DapperContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection") ?? "nullable";
    }

    public IDbConnection CreateConnection()
    {
        return new SqliteConnection(_connectionString);
    }
}
