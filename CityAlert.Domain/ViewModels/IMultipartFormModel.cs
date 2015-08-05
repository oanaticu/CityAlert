namespace CityAlert.Domain.ViewModels
{
    public interface IMultipartFormModel
    {
        void SetPropertyValue(string propertyName, string value);
        bool IsValid(out string errorMessage);
        void AddFile(string fileName, byte[] fileContent, string mimetype);
    }
}
