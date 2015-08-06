
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CityAlert.Domain.Modules;
using CityAlert.Domain.Services;
using CityAlert.Domain.ViewModels;
using CityAlert.Resources;
using CityAlertWS.Queries;

namespace CityAlertWS.Controllers
{
    public class ContactController : ApiController
    {

        private readonly LoggerService _loggerService = new LoggerService();
        private readonly EmailService _emailService = new EmailService();
        private readonly ContactModule _contactModule = new ContactModule();
        private readonly RegexUtilities _util = new RegexUtilities();

        [ActionName("SendFAQ")]
        [HttpPost]
        public async Task<SendFAQResponse> SendFAQ(SendFAQModel model)
        {
            var response = new SendFAQResponse();

            try
            {
                var cleanEmail = model.Email.Trim().ToLower();
                if (!_util.IsValidEmail(cleanEmail))
                {
                    response.Error = Errors.InvalidEmail;
                }
                else
                {
                    var to = ConfigurationManager.AppSettings["SMTP_Account"];

                    string body = "Nume utilizator: <strong>" + model.Name + "</strong><br/>";
                    body += "Email: <strong>" + cleanEmail + "</strong><br/>";
                    body += "Mesaj: <br/>" + model.Message + "<br/>";

                    await _emailService.SendEmail(cleanEmail, to, "FAQ", body);
                }
            }
            catch (Exception ex)
            {
                _loggerService.LogException("SendFAQ", ex, model);
                response.Error = _loggerService.GetClientException(ex);
            }

            return response;
        }

        [ActionName("SubscribeToNewsletter")]
        [HttpPost]
        public async Task<SubscribeToNewsletterResponse> SubscribeToNewsletter(SubscribeToNewsletterModel model)
        {
            var response = new SubscribeToNewsletterResponse();

            try
            {
                var cleanEmail = model.Email.Trim().ToLower();
                
                if (!_util.IsValidEmail(cleanEmail))
                {
                    response.Error = Errors.InvalidEmail;
                }
                else
                {
                    _contactModule.SubscribeToNewsletter(cleanEmail);
                }
                
            }
            catch (Exception ex)
            {
                _loggerService.LogException("SubscribeToNewsletter", ex, model);
                response.Error = _loggerService.GetClientException(ex);
            }

            return response;
        }
    }
}
