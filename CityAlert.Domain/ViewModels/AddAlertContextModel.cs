﻿using System;
using System.Text;
using System.Web.Script.Serialization;

namespace CityAlert.Domain.ViewModels
{
    public class AddAlertContextModel : IMultipartFormModel
    {
        //public int ContactId { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string StreetNo { get; set; }
        public string StreetName { get; set; }
        public string AddressLatitude { get; set; }
        public string AddressLongitude { get; set; }
        public string UserLatitude { get; set; }
        public string UserLongitude { get; set; }
        public bool IsPublic { get; set; }
        public string PhotoName { get; set; }

        public void SetPropertyValue(string propertyName, string value)
        {
            switch(propertyName)
            {
              case "CategoryId": 
                    int categoryId;
                    if (Int32.TryParse(value, out categoryId))
                        CategoryId = categoryId;
                    break;
                case "Description": Description = value;
                    break;
                case "City": City = value;
                    break;
                case "StreetNo": StreetNo = value;
                    break;
                case "StreetName": StreetName = value;
                    break;
                case "AddressLatitude": AddressLatitude = value;
                    break;
                case "AddressLongitude": AddressLongitude = value;
                    break;
                case "UserLatitude": UserLatitude = value;
                    break;
                case "UserLongitude": UserLongitude = value;
                    break;
                case "IsPublic":
                    bool isPublic;
                    if (bool.TryParse(value, out isPublic))
                        IsPublic = isPublic;
                    break;
            }
        }


        public bool IsValid(out string errorMessage)
        {
            errorMessage = null;
            StringBuilder sb = new StringBuilder();

            if (CategoryId == 0)
            {
                sb.AppendLine("Id-ul categorie trebuie specificat.");
            }
            if (string.IsNullOrWhiteSpace(City))
            {
                sb.AppendLine("Orasul trebuie specificat.");
            }
            if (string.IsNullOrWhiteSpace(StreetName))
            {
                sb.AppendLine("Strada trebuie specificata.");
            }
            if (string.IsNullOrWhiteSpace(StreetNo))
            {
                sb.AppendLine("Numarul strazii trebuie specificat.");
            }
            if (string.IsNullOrWhiteSpace(AddressLatitude))
            {
                sb.AppendLine("Latitidinea adresei trebuie specificata.");
            }
            if (string.IsNullOrWhiteSpace(AddressLongitude))
            {
                sb.AppendLine("Longitudinea adresei trebuie specificata.");
            }
            if(Description != null && Description.Length > 1000)
            {
                sb.AppendLine("Descrierea nu poate avea mai mult de 1000 caractere");
            }

            if (sb.Length > 0)
                errorMessage = sb.ToString();

            return (errorMessage == null);
        }

        public void AddFile(string fileName, byte[] fileContent, string mimetype)
        {
            PhotoName = fileName;
            //PhotoContent = fileContent;
        }

    }
}
