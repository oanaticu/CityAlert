using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using CityAlert.Domain.Models;
using CityAlert.Domain.ViewModels;

namespace CityAlertWS.Queries
{
    public class ContactQueries
    {
        private readonly CityAlertContext _context;

        public ContactQueries()
        {
            _context = new CityAlertContext();
        }

        public List<FAQModel> GetFAQs()
        {
            var faqs = _context.FAQs
                    .Select(f => new FAQModel()
                        {
                            Question = f.Question,
                            Answer = f.Answer
                        }).ToList();

            return faqs;

        }

        public IEnumerable<EventModel> GetEvents()
        {
            var dbEvents = _context.Events.OrderByDescending(e => e.OccurredOn).ToList();

            var events = new List<EventModel>();

            dbEvents.ForEach(a => events.Add(new EventModel()
                {
                    Date = a.OccurredOn.ToString("dd.MM.yyyy"),
                    Name = a.Name
                }));
                    

            return events;
        }
    }
}