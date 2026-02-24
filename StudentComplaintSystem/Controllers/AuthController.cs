using Microsoft.AspNetCore.Mvc;
using StudentComplaintSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace StudentComplaintSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Hardcoded users for demonstration since no database is used
        private static List<User> _users = new List<User>
        {
            new User { Username = "admin", Password = "admin123", Role = "Admin" },
            new User { Username = "student", Password = "student123", Role = "Student" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
            
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // In a real app, we would return a JWT token. 
            // For this simple demo, we return the user info.
            return Ok(new { 
                username = user.Username, 
                role = user.Role 
            });
        }
    }
}
