using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityAlertWS.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid? ParentId { get; set; }

        public int Statuscode { get; set; }

        public bool IsParent { get; set; }
    }
}
