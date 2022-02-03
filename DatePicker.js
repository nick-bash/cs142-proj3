/* Nicholas Bashour - CS 142 - Project 3 - February 2, 2022 */

'use strict';

function DatePicker(id, callback)
{
    this.id = id;
    this.callback = callback;    
}

DatePicker.prototype.render = function(date)
{    
    const indexToMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var createCalendar = () =>
    {       
        // Add event listeners to change the calendar
        var changeMonth = (event, change) =>
        {                            
            date.setMonth(date.getMonth() + change);            
            createCalendar();
        };
        var changeMonthUp = (event) => {changeMonth(event,1);};
        var changeMonthDown = (event) => {changeMonth(event,-1);};   

        var innerHTML = '<table id="' + this.id + '_table" class="dateTable"><tr class="headerRow"><td><b id="' + this.id + '_lt">'+
            '&lt</b></td><td colspan="5"><b>';
        var sourceElement = document.getElementById(this.id);
        var calendarTitle = indexToMonth[date.getMonth()] + " " + date.getFullYear();
        innerHTML += calendarTitle;
        innerHTML += '</b></td><td><b id="' + this.id + '_gt">&gt</b></td></tr><tr><td class="dayNames">Su</td><td class="dayNames">' +
            'Mo</td><td class="dayNames">Tu</td><td class="dayNames">We</td><td class="dayNames">Th</td><td class="dayNames">Fr</td><td class="dayNames">Sa</td></tr>';
        sourceElement.innerHTML = innerHTML;     
        var gt = document.getElementById(this.id + "_gt");        
        gt.onclick = changeMonthUp;
        var lt = document.getElementById(this.id + "_lt");
        lt.onclick = changeMonthDown;
        var table = document.getElementById(this.id + "_table");
        
        // Calculate calendar length
        var monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        var weekdaysPriorMonthStart = monthStart.getDay();
        // day = 0 means last day of prior month
        var monthEnd = new Date(date.getFullYear(), date.getMonth()+1, 0);        
        var weekdayOfMonthEnd = monthEnd.getDay();
        var weekdaysAfterMonthEnd = 6 - weekdayOfMonthEnd;        
        var numWeeks = (weekdaysPriorMonthStart + monthEnd.getDate()
            + weekdaysAfterMonthEnd)/7;

        // Create an array of all the days
        var dates = [];
        var inCurrentMonth = [];
        var i = 0;
        var priorMonthEndDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        // Days from prior month
        while(weekdaysPriorMonthStart>0)
        {
            dates[i] = priorMonthEndDate - weekdaysPriorMonthStart-- + 1;
            inCurrentMonth[i] = false;
            i++;
        }

        // Days from current month
        for(var j = 1; j <= monthEnd.getDate(); j++)
        {
            dates[i] = j;
            inCurrentMonth[i] = true;
            i++;
        }

        // Days from next month
        for(var k = 1; k <= weekdaysAfterMonthEnd; k++)
        {
            dates[i] = k;
            inCurrentMonth[i] = false;
            i++;
        }

        // Define day click handler
        var dayClicked = (event) =>
        {
            var day = event.target.innerHTML;
            var ret = {month: date.getMonth() + 1, day: day, year: date.getFullYear()};
            this.callback(this.id, ret);
        };
        
        // Fill the calendar week by week
        for(i = 0; i < numWeeks; i++)
        {
            // Opening table row
            var row = document.createElement("tr");
            // For each day
            for(var l = 0; l < 7; l++)
            {
                var day = document.createElement("td");
                // If not in the current month, shade it
                if(!inCurrentMonth[l+i*7])
                {
                    day.className = "shadedDay";
                }
                // If in current month, add event handler
                else {
                    day.onclick = dayClicked;
                }
                day.innerHTML = dates[l+i*7];
                row.appendChild(day);
            }       
            
            table.appendChild(row);
        }
    };
    createCalendar();        
};