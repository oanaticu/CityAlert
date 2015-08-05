using System.Collections.Generic;

namespace CityAlert.Domain.ViewModels
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
