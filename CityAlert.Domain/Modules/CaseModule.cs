using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CityAlert.Domain.Models;
using CityAlert.Domain.StaticData;
using CityAlert.Domain.ViewModels;

namespace CityAlert.Domain.Modules
{
    public class CaseModule 
    {
        private readonly CityAlertContext _context;

        public CaseModule()
        {
            _context = new CityAlertContext();
        }

        public int AddAlert(AddAlertContextModel model)
        {
            var newAlert = new Case()
                {
                    CityName = model.City,
                    Description = model.Description,
                    ImageName = model.PhotoName,
                    IsPublic = model.IsPublic,
                    Lat = model.AddressLatitude,
                    Long = model.AddressLongitude,
                    StreetName = model.StreetName,
                    StreetNo = model.StreetNo,
                    SysCategoryId = model.CategoryId,
                    SysStatusId = (int) SysStatusEnum.Sent,
                    Title = model.Description,
                    //CreatedOn = DateTime.Now
                    Code = Guid.NewGuid()

                };

            _context.Cases.Add(newAlert);
            _context.SaveChanges();

            return newAlert.CaseId;
        }

    }
}
