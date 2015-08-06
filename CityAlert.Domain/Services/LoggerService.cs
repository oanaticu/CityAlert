using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using CityAlert.Domain.Models;
using CityAlert.Resources;

namespace CityAlert.Domain.Services
{
    public class LoggerService
    {
        private readonly CityAlertContext _context;

        public LoggerService()
        {
            _context = new CityAlertContext();
        }

        public void LogException(string method, Exception ex, object context)
        {
            var aex = ex as AggregateException;
            if (aex != null)
            {
                ex = aex.Flatten();
                if (ex.InnerException != null) ex = ex.InnerException;
            }

            string contextString = string.Empty;
            if (context != null)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                contextString = serializer.Serialize(context);
            }

            var error = new Error()
                {
                    OccurredOn = DateTime.Now,
                    Context = contextString,
                    Method = method,
                    FullErrorText = ex.ToString()
                };
            _context.Errors.Add(error);
            _context.SaveChanges();

            /*using (SqlConnection conn = new SqlConnection(SQLDBConnectionString()))
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"insert into [dbo].[ts_errorLog](Method,Context,FullErrorText) VALUES (@method,@contextString,@fullErrorText)";
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new SqlParameter("method", method));
                        cmd.Parameters.Add(new SqlParameter("contextString", contextString));
                        cmd.Parameters.Add(new SqlParameter("fullErrorText", ex.ToString()));
                        cmd.ExecuteNonQuery();
                    }
                }*/

        }

        public void ThrowGenericException(Exception ex)
        {
            throw new ApplicationException(GetClientException(ex));
        }

        public string GetClientException(Exception ex)
        {
            return Errors.GeneralError;
        }

        /*public void ProcessException(string action, Exception ex, object model)
        {
            var aex = ex as AggregateException;
            if (aex != null)
            {
                ex = aex.Flatten();
                if (ex.InnerException != null) ex = ex.InnerException;
            }

            LogException(action, ex, model);
        }*/
    }
}
