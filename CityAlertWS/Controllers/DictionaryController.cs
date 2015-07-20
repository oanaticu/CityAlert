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
    public class DictionaryController : ApiController
    {
        private readonly DictionaryQueries _dicQueries = new DictionaryQueries();

        [ActionName("GetCategories")]
        [HttpGet]
        public IEnumerable<Category> GetCategories()
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
