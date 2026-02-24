using Microsoft.AspNetCore.Mvc;
using StudentComplaintSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace StudentComplaintSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintController : ControllerBase
    {
        private static List<Complaint> _complaints = new List<Complaint>();
        private static int _nextId = 1;

        [HttpGet]
        public IEnumerable<Complaint> Get()
        {
            return _complaints;
        }

        [HttpPost]
        public ActionResult<Complaint> Post(Complaint complaint)
        {
            complaint.Id = _nextId++;
            complaint.CreatedAt = DateTime.Now;
            _complaints.Add(complaint);
            return CreatedAtAction(nameof(Get), new { id = complaint.Id }, complaint);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var complaint = _complaints.FirstOrDefault(c => c.Id == id);
            if (complaint == null)
            {
                return NotFound();
            }
            _complaints.Remove(complaint);
            return NoContent();
        }
    }
}
