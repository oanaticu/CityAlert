﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CityAlert.Domain.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CityAlertContext : DbContext
    {
        public CityAlertContext()
            : base("name=CityAlertContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<SysCategory> SysCategories { get; set; }
        public virtual DbSet<SysStatus> SysStatus1 { get; set; }
        public virtual DbSet<Error> Errors { get; set; }
        public virtual DbSet<NewsletterSubscription> NewsletterSubscriptions { get; set; }
        public virtual DbSet<FAQ> FAQs { get; set; }
        public virtual DbSet<Event> Events { get; set; }
    }
}
