using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
//using System.Web.Http.Cors;

namespace CityAlertWS
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
           /* config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );*/
             config.Routes.MapHttpRoute(
                 name: "API_RPC_Style", 
                 routeTemplate: "api/{controller}/{action}/{id}", 
                 defaults: new { id = RouteParameter.Optional }); //api/

            config.Routes.MapHttpRoute(
                name: "DefaultApi", 
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            /*var corsAttr = new EnableCorsAttribute(ConfigurationManager.AppSettings["DomainURL"].ToString(), "*", "*");
            config.EnableCors(corsAttr);*/

            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            config.EnableSystemDiagnosticsTracing();
        }
    }
}
