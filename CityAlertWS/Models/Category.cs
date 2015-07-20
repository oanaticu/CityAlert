using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityAlertWS.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? ParentId { get; set; }

        public bool IsParent { get; set; }

        public List<Category> SubCategories { get; set; }

        public Category()
        {
            SubCategories = new List<Category>();
        }
    }
}
