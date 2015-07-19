using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityAlertWS.Domain.Models
{
    public interface IMultipartFormModel
    {
        void SetPropertyValue(string propertyName, string value);
        bool IsValid(out string errorMessage);
        void AddFile(string fileName, byte[] fileContent, string mimetype);
    }
}
