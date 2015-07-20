using CityAlertWS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CityAlertWS.Queries;

namespace CityAlertWS.Controllers
{
    public class CategoryController : ApiController
    {
        private readonly DictionaryQueries _dicQueries = new DictionaryQueries();


        public IEnumerable<Category> Get()
        {
            List<Category> res = new List<Category>();

            try
            {
                res = _dicQueries.GetCategories();
            }
            catch (Exception ex)
            {
                //var t = ex.Message;
            }

            return res;
        }
    }
}
