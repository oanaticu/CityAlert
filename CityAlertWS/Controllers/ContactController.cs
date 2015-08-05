
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CityAlert.Domain.Services;
using CityAlert.Domain.ViewModels;
using CityAlertWS.Queries;

namespace CityAlertWS.Controllers
{
    public class ContactController : ApiController
    {

        private readonly LoggerService _loggerService = new LoggerService();
        private readonly EmailService _emailService = new EmailService();

        [ActionName("SendFAQ")]
        [HttpPost]
        public async Task<SendFAQResponse> SendFAQ(SendFAQModel model)
        {
            var response = new SendFAQResponse();

            try
            {
                var to = ConfigurationManager.AppSettings["SMTP_Account"];

                string body = "From: " + model.Name + "<br/>";
                body += "Email: " + model.Email + "<br/>";
                body += "Subject: FAQ <br/>";
                body += "Question: <br/>" + model.Message + "<br/>";

                await _emailService.SendEmail(model.Email, to, "FAQ", body);
            }
            catch (Exception ex)
            {
                _loggerService.ProcessException("SendFAQ", ex, null);
                response.Error = _loggerService.GetClientException(ex);
            }

            return response;
        }
    }
}
