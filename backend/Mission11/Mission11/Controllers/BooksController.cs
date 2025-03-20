using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(
            int pageNumber = 1, int pageSize = 5, string? sortBy = null)
        {
            var booksQuery = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                booksQuery = sortBy.ToLower() switch
                {
                    "title" => booksQuery.OrderBy(b => b.Title),
                    _ => booksQuery
                };
            }

            var books = await booksQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(books);
        }
    }
}
