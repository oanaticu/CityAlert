using CityAlertWS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CityAlertWS.Models;
using System.Configuration;
using System.Threading.Tasks;
using CityAlertWS.Domain.Models;

namespace CityAlertWS.Controllers
{
    public class CaseController : ApiController
    {
        public IEnumerable<Case> Get()
        {
            IEnumerable<Case> response = new List<Case>()
            {
                new Case(){
                    CategId = 1,
                    Code = Guid.NewGuid(),
                    CityName = "Bucuresti",
                    Description = "bla bla",
                    Id = 1,
                    Image = ConfigurationManager.AppSettings["AlertImagesPath"].ToString()+"aston-martin-db4.jpg",
                    IsPublic = true,
                    Lat = "15",
                    Long = "22",
                    LongAgo = "5h",
                    ModifiedOn = DateTime.Now,
                    StatusId = 1,
                    StreetName = "Zizin",
                    StreetNo = "5",
                    Title = "Defectiue tehnica"

                }
            };

            //try
            //{
            //    response = caseModule.GetRecentAlert();
            //}
            //catch (Exception ex)
            //{
            //    ProcessException("GetRecentAlert", ex, null);
            //}

            return response;
        }

        /// multipart request
        // POST: http://localhost/CitizenshipWS/Case/AddAlert
        // request body {"ContactId":"49A7DF48-B7D7-E411-B02F-00155D3A7CBC", "CategoryId":"7054716E-45E7-E411-857A-00155D3A7717", "Description":"descr", "City":"Bucuresti sect 3", "StreetName":"rotunda", "StreetNo":"11", "AddressLatitude":"45.010101", "AddressLongitude":"22.34567", "UserLatitude":"1", "UserLongitude":"2", "IsPublic":"true", "SendFeedback":"true" }
        [ActionName("AddAlert")]
        [HttpPost]
        public async Task<AddAlertResponse> AddAlert()
        {
            AddAlertContextModel model = new AddAlertContextModel();
            AddAlertResponse response = new AddAlertResponse();

            try
            {
                string error = await ProcessMultipartForm(model);

                if (string.IsNullOrWhiteSpace(error))
                {
                    
                }
                   // response.IdAlert = await caseModule.AddAlert(model);
                else
                    response.Error = error;
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                //ProcessException("AddAlert", ex, model);
                //response.Error = loggerService.GetClientException(ex);
            }

            return response;
        }

        // POST: http://localhost/CitizenshipWS/Case/AddAlertNoPhoto
        // request body {"ContactId":"49A7DF48-B7D7-E411-B02F-00155D3A7CBC", "CategoryId":"7054716E-45E7-E411-857A-00155D3A7717", "Description":"descr", "City":"Bucuresti sect 3", "StreetName":"rotunda", "StreetNo":"11", "AddressLatitude":"45.010101", "AddressLongitude":"22.34567", "UserLatitude":"1", "UserLongitude":"2", "IsPublic":"true", "SendFeedback":"true" }
        [ActionName("AddAlertNoPhoto")]
        [HttpPost]
        public async Task<AddAlertResponse> AddAlertNoPhoto(AddAlertContextModel model)
        {
            AddAlertResponse response = new AddAlertResponse();

            try
            {
                string error = null;

                if (model.IsValid(out error))
                {
                    //response.IdAlert = await caseModule.AddAlert(model);
                }
                else
                    response.Error = error;
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                //ProcessException("AddAlertNoPhoto", ex, model);
                //response.Error = loggerService.GetClientException(ex);
            }

            return response;
        }

        private async Task<string> ProcessMultipartForm(IMultipartFormModel model)
        {
            string error = null;

            // get the picture and the picture name here
            if (Request != null && Request.Content != null && Request.Content.IsMimeMultipartContent())
            {
                string root = System.Web.HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["AlertImagesPath"].ToString());
                var provider = new MultipartFormDataStreamProvider(root);

                await Request.Content.ReadAsMultipartAsync(provider);

                // get the form data.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        model.SetPropertyValue(key, val);
                        break;
                    }
                }

                if (model.IsValid(out error))
                {
                    // get the file content.
                    foreach (MultipartFileData file in provider.FileData)
                    {
                        string fileName = file.Headers.ContentDisposition.FileName;
                        if (!string.IsNullOrWhiteSpace(fileName))
                            fileName = fileName.Trim('"');
                        byte[] fileContent = System.IO.File.ReadAllBytes(file.LocalFileName);
                        string mimetype = file.Headers.ContentType.MediaType;
                        if (fileContent.Length > 0)
                            model.AddFile(fileName, fileContent, mimetype);
                        //System.IO.File.Delete(file.LocalFileName);
                    }
                }

            }
            else throw new ApplicationException("The request is not mime multipart content");

            return error;
        }

        private void ProcessException(string action, Exception ex, object model)
        {
            AggregateException aex = ex as AggregateException;
            if (aex != null)
            {
                ex = aex.Flatten();
                if (ex.InnerException != null) ex = ex.InnerException;
            }

            //loggerService.LogException(action, ex, model);
        }

    }
}
