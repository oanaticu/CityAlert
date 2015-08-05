
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CityAlert.Domain.Services;
using CityAlert.Domain.ViewModels;
using CityAlertWS.Queries;

namespace CityAlertWS.Controllers
{
    public class DictionaryController : ApiController
    {
        private readonly DictionaryQueries _dicQueries = new DictionaryQueries();
        private readonly LoggerService _loggerService = new LoggerService();

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
                _loggerService.ProcessException("GetRecentAlert", ex, null);
            }

            return res;
        }
    }
}
