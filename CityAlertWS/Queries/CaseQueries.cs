using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Web;
using CityAlert.Domain.Models;
using CityAlertWS.Models;
using System.Data.Entity;

namespace CityAlertWS.Queries
{
    public class CaseQueries
    {
        private readonly CityAlertContext _context;

        public CaseQueries()
        {
            _context = new CityAlertContext();
        }

        public List<CaseModel> GetAlerts()
        {
            var cases = _context.Cases.Include(c => c.SysStatus).ToList();
            var list = new List<CaseModel>();
            foreach (var c in cases)
            {
                TimeSpan diff = (DateTime.Now - c.CreatedOn);
                string formatted = string.Format(
                       CultureInfo.CurrentCulture, 
                       "{0} zile {1} h {2} m {3} s", 
                       diff.Days, 
                       diff.Hours, 
                       diff.Minutes, 
                       diff.Seconds);

                var model = new CaseModel()
                {
                    CategId = c.SysCategoryId, //1,
                    Code = c.Code, //Guid.NewGuid(),
                    CityName = c.CityName, //"Bucuresti",
                    Description = c.Description, //"bla bla",
                    Id = c.CaseId, //1,
                    Image = ConfigurationManager.AppSettings["AlertImagesPath"].ToString() + c.ImageName,
                    //"aston-martin-db4.jpg",
                    IsPublic = c.IsPublic, //true,
                    Lat = c.Lat, //"15",
                    Long = c.Long, //"22",
                    LongAgo = formatted, //"5h",
                    StatusName = c.SysStatus.Name,//1,
                    StatusColor = c.SysStatus.Color,
                    StreetName = c.StreetName,//"Zizin",
                    StreetNo = c.StreetNo, //"5",
                    Title = c.Title //"Defectiue tehnica"

                };

                list.Add(model);
            }

            return list;
        }
    }
}