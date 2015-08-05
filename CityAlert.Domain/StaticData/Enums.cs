using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityAlert.Domain.StaticData
{
   public enum SysStatusEnum
   {
Sent = 1,
Canceled = 2,
       Received = 3,
       InProgress = 4,
       SentToAuthorities = 5,
       NotSolved = 6,
       WaitingForConfirmation = 7,
       Solved = 8
   }
}
