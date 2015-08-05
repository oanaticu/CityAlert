using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using CityAlert.Resources;

namespace CityAlert.Domain.Services
{
    public class LoggerService 
    {
        public void LogException(string method, Exception ex, object context)
        {
            try
            {
                AggregateException aex = ex as AggregateException;
                if (aex != null)
                {
                    ex = aex.Flatten();
                    if (ex.InnerException != null) ex = ex.InnerException;
                }

                string contextString = string.Empty;
                if(context != null)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    contextString = serializer.Serialize(context);
                }

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
            catch
            {
            }
        }

        public void ThrowGenericException(Exception ex)
        {
            throw new ApplicationException(GetClientException(ex));
        }

        public string GetClientException(Exception ex)
        {
            return Errors.GeneralError;
        }

        public void ProcessException(string action, Exception ex, object model)
        {
            AggregateException aex = ex as AggregateException;
            if (aex != null)
            {
                ex = aex.Flatten();
                if (ex.InnerException != null) ex = ex.InnerException;
            }

            LogException(action, ex, model);
        }
    }
}
