using System.Configuration;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CityAlert.Domain.Services
{
    public class EmailService
    {
        public async Task SendEmail(string smtpFrom,string smtpTo, string messageSubject, string messageBody)
        {
            int smtpPort = int.Parse(ConfigurationManager.AppSettings["SMTP_Port"]);
            string smtpServer = ConfigurationManager.AppSettings["SMTP_Server"];
            //string smtpTo = ConfigurationManager.AppSettings["SMTP_To"];
            string smtpUser = ConfigurationManager.AppSettings["SMTP_User"];
            string smtpPassword = ConfigurationManager.AppSettings["SMTP_Password"];
            bool smtpUseSSL = ConfigurationManager.AppSettings["SMTP_UseSSL"] == "1";

            MailMessage mail = new MailMessage(smtpFrom, smtpTo);
            SmtpClient client = new SmtpClient();
            client.Port = smtpPort;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Host = smtpServer;
            client.EnableSsl = smtpUseSSL;
            if(!string.IsNullOrWhiteSpace(smtpPassword))
                client.Credentials = new System.Net.NetworkCredential(smtpUser, smtpPassword);
            client.Timeout = 20000;

            mail.Subject = messageSubject;
            mail.Body = messageBody;
            mail.IsBodyHtml = true;
            await client.SendMailAsync(mail);
        }


    }
}
