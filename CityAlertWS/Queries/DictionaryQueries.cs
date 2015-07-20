using System;
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
            return _context.SysCategories.Select(c => new Category()
            {
                Id = c.SysCategoryId,
                Name = c.Name,
                ParentId = c.ParentCategoryId,
                IsParent = !c.ParentCategoryId.HasValue
            }).ToList();
        } 
    }
}