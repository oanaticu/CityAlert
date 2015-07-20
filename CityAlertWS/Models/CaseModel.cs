using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CityAlertWS.Models
{
    public class CaseModel
    {
        public int Id { get; set; }
        public Guid Code { get; set; }

        public int CategId { get; set; }
        public string StatusName { get; set; }
        public string StatusColor { get; set; }
        //public DateTime? ModifiedOn { get; set; }
        public string LongAgo { get; set; }
        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public string StreetName { get; set; }
        public string StreetNo { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }

        public string Title { get; set; }

        public string CityName { get; set; }

        public string Image { get; set; }
    }

    //public class Case : CaseBase
    //{
    //    public byte[] Thumbnail { get; set; }
    //}

}