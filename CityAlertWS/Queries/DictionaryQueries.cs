using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CityAlert.Domain.Models;
using CityAlertWS.Models;

namespace CityAlertWS.Queries
{
    public class DictionaryQueries
    {
        private readonly CityAlertContext _context;

        public DictionaryQueries()
        {
            _context = new CityAlertContext();
        }

        public List<Category> GetCategories()
        {
            var dbSet = _context.SysCategories;
            var categories = dbSet.Where(c => !c.ParentCategoryId.HasValue).Select(c => new Category()
            {
                Id = c.SysCategoryId,
                Name = c.Name,
                ParentId = c.ParentCategoryId,
                IsParent = !c.ParentCategoryId.HasValue
            }).ToList();

            foreach (var cat in categories)
            {
                cat.SubCategories = dbSet.Where(c => c.ParentCategoryId == cat.Id)
                    .Select(c => new Category()
                    {
                        Id = c.SysCategoryId,
                        Name = c.Name,
                        ParentId = c.ParentCategoryId,
                        IsParent = !c.ParentCategoryId.HasValue
                    }).ToList();
            }

            return categories;
        } 
    }
}