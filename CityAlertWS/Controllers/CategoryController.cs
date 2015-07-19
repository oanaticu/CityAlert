using CityAlertWS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CityAlertWS.Controllers
{
    public class CategoryController : ApiController
    {
        public IEnumerable<Category> Get()
        {
            List<Category> res = new List<Category>();

            //try
            //{
            //    using (SqlConnection conn = new SqlConnection(SQLDBConnectionString()))
            //    {
            //        conn.Open();

            //        SqlCommand cmd = conn.CreateCommand();
            //        cmd.CommandText = "select * from mob_categories";
            //        cmd.CommandType = CommandType.Text;
            //        SqlDataReader reader = cmd.ExecuteReader();

            //        if (reader.HasRows)
            //        {
            //            while (reader.Read())
            //            {
            //                Category cat = new Category();
            //                cat.Id = (Guid)reader["id"];
            //                cat.Name = reader["name"].ToString();
            //                cat.ParentId = reader["parentid"] == System.DBNull.Value ? null : (Guid?)reader["parentid"];
            //                cat.Statuscode = (int)reader["statuscode"];
            //                cat.IsParent = Convert.ToBoolean(reader["isparent"]);
            //                res.Add(cat);
            //            }
            //        }
            //        reader.Close();
            //        conn.Close();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    var t = ex.Message;
            //}

            return res;
        }
    }
}
