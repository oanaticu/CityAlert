using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CityAlert.Domain.Models;

namespace CityAlert.Domain.Modules
{
    public class ContactModule
    {
        private readonly CityAlertContext _context;

        public ContactModule()
        {
            _context = new CityAlertContext();
        }

        public int SubscribeToNewsletter(string email)
        {
            // check if email exists
            var subscription = _context.NewsletterSubscriptions.SingleOrDefault(s => s.Email.Trim().ToLower() == email);

            // insert entrance in table
            if (subscription == null)
            {
                subscription = new NewsletterSubscription()
                    {
                        Email = email,
                        IsActive = true
                    };
                _context.NewsletterSubscriptions.Add(subscription);
            }
            else
            {
                subscription.IsActive = true;
            }

            _context.SaveChanges();

            //return entrance id
            return subscription.NewsletterSubscriptionId;
        }
    }
}
