 window.Calendar = (function() {
   var today = moment();

   function Calendar(selector, events) {
     // Get element
     this.el = document.querySelector(selector);
     let events_ = [];

     for (let eventIndex = 0, eventsCount = events.length; eventIndex < eventsCount; eventIndex++) {
       let ev = events[eventIndex];

       // Preset color if doesn't exists
       ev.color = ev.color || 'black';

       // Preset 'eventFrom' and 'eventTo' if doesn't exists
       if (!ev.eventFrom || !ev.eventTo) {
         let randomDateRange = this.getRandomDateRange();
         ev.eventFrom = randomDateRange.eventFrom;
         ev.eventTo = randomDateRange.eventTo;
       }

       // Preset 'eventName' if doesn't exists
       ev.eventName = ev.eventName || this.getRandomEventName();

       // Get number of day differences
       let daysDifference = moment(ev.eventTo, "YYYY-MM-DD HH:mm:ss").diff(moment(ev.eventFrom, "YYYY-MM-DD HH:mm:ss"), 'days');

       // Insert into array of events for each of the day difference
       for (let day = 0; day <= daysDifference; day++) {
         let eventDate = JSON.parse(JSON.stringify(ev));
         eventDate.eventTime = moment(ev.eventFrom, "YYYY-MM-DD HH:mm:ss").add(day, 'days').format("YYYY-MM-DD HH:mm:ss");
         events_.push(eventDate);
       }
     }

     // Get events
     this.events = events_;
     // Get current date
     this.current = moment().date(1);
     // Draw calendar
     this.draw();

     var current = document.querySelector(".today");

     if (current) {
       var self = this;
       window.setTimeout(function() {
         self.openDay(current);
       }, 500);
     }
   };

   Calendar.prototype.getRandomDateRange = function() {
     let dateFrom = Math.floor(Math.random() * 25) + 1,
       dateTo = dateFrom + Math.floor(Math.random() * 4) + 1,
       timeFrom = Math.floor(Math.random() * 19) + 1,
       timeTo = timeFrom + Math.floor(Math.random() * 3) + 1,
       d = new Date(),
       month = d.getMonth() + Math.floor(Math.random() * 5) - 2,
       year = d.getFullYear();

     timeFrom = timeFrom < 10 ? '0' + timeFrom : timeFrom;
     timeTo = timeTo < 10 ? '0' + timeTo : timeTo;

     return {
       'eventFrom': year + '-' + month + '-' + dateFrom + ' ' + timeFrom + ':' + (Math.random() <= 0.5 ? '00' : '30') + ':00',
       'eventTo': year + '-' + month + '-' + dateTo + ' ' + timeTo + ':' + (Math.random() <= 0.5 ? '00' : '30') + ':00',
     };
   };

   Calendar.prototype.getRandomEventName = function() {
     let temp = ['Community Garden Workshop', 'Arts Festival', 'Gardening', "Adam's birthday party", "St. Patrick Day", 'Valentine Day', "April Fool's Day", 'Earth Day', "Mother's Day", "Father's Day", 'Memorial Day', 'Grandma Visit', 'Doing homework', 'Doing household chores', 'Feeding pets', 'Vacuuming', 'Doing laundry', 'Floor sweeping', 'Surf social media', 'Studying for exam', 'Movie theatre', 'Meeting with old pals', 'Conference meeting', 'Group discussion', 'Interview with Jr. Web Developer', 'Presentation', 'Teach Kids to Code', 'Cooking time', 'Playing basketball', 'Playing football', 'Lunch with families', 'Lunch with Colleagues', 'Outings with Mark', 'Gaming time', 'Free Tamale Night'];
     return temp[Math.floor(Math.random() * temp.length)];
   };

   Calendar.prototype.draw = function() {
     // Create Header
     this.drawHeader();

     // Create legends
     this.drawLegend();

     // Draw Month
     this.drawMonth();

     // this.drawLegend();
   };

   Calendar.prototype.currentYear = function() {
     return this.current.format("YYYY");
   };

   Calendar.prototype.drawHeader = function() {
     var self = this;
     if (!this.header) {
       //Create the header elements
       this.header = createElement("div", "header");
       this.header.className = "header";

       this.title = createElement("h1");

       var right = createElement("div", "right");
       right.innerHTML = '<div style=" padding: 25px; transform: translate(-30px, -25px); "></div>';
       right.addEventListener("click", function() {
         self.nextMonth();
       });

       var left = createElement("div", "left");
       left.innerHTML = '<div style=" padding: 25px; transform: translate(-20px, -25px); "></div>';
       left.addEventListener("click", function() {
         self.prevMonth();
       });

       //Append the Elements
       this.header.appendChild(this.title);
       this.header.appendChild(right);
       this.header.appendChild(left);
       this.el.appendChild(this.header);
     }

     this.title.innerHTML = this.current.format("MMMM YYYY");
   };

   Calendar.prototype.drawHeader = function() {
     var self = this;
     if (!this.header) {
       //Create the header elements
       this.header = createElement("div", "header");
       this.header.className = "header";

       this.title = createElement("h1");

       var right = createElement("div", "right");
       right.addEventListener("click", function() {
         self.nextMonth();
       });

       var left = createElement("div", "left");
       left.addEventListener("click", function() {
         self.prevMonth();
       });

       //Append the Elements
       this.header.appendChild(this.title);
       this.header.appendChild(right);
       this.header.appendChild(left);
       this.el.appendChild(this.header);
     }

     this.title.innerHTML = this.current.format("MMMM YYYY");
   };

   Calendar.prototype.drawMonth = function() {
     var self = this;

     this.events.forEach(function(ev) {
       ev.date = moment(ev.eventTime, "YYYY-MM-DD hh:mm:ss");
     });

     if (this.month) {
       this.oldMonth = this.month;
       if (self.next)
         this.oldMonth.className = "month out " + (self.next ? "prev" : "prev");
       else
         this.oldMonth.className = "month out " + (self.next ? "prev" : "prev");

       this.oldMonth.addEventListener("webkitAnimationEnd", function() {
         self.oldMonth.parentNode.removeChild(self.oldMonth);
         self.month = createElement("div", "month");
         self.backFill();
         self.currentMonth();
         self.fowardFill();
         self.el.appendChild(self.month);
         window.setTimeout(function() {
           if (self.next)
             self.month.className = "month in " + (self.next ? "prev" : "prev");
           else
             self.month.className = "month in " + (self.next ? "prev" : "prev");
         }, 150);
       });
     } else {
       this.month = createElement("div", "month");
       this.el.appendChild(this.month);
       this.backFill();
       this.currentMonth();
       this.fowardFill();
       this.month.className = "month new";
     }
   };

   Calendar.prototype.backFill = function() {
     var clone = this.current.clone();
     var dayOfWeek = clone.day();

     if (!dayOfWeek) {
       return;
     }

     clone.subtract("days", dayOfWeek + 1);

     for (var i = dayOfWeek; i > 0; i--) {
       this.drawDay(clone.add("days", 1));
     }
   };

   Calendar.prototype.fowardFill = function() {
     var clone = this.current
       .clone()
       .add("months", 1)
       .subtract("days", 1);
     var dayOfWeek = clone.day();

     if (dayOfWeek === 6) {
       return;
     }

     for (var i = dayOfWeek; i < 6; i++) {
       this.drawDay(clone.add("days", 1));
     }
   };

   Calendar.prototype.currentMonth = function() {
     var clone = this.current.clone();

     while (clone.month() === this.current.month()) {
       this.drawDay(clone);
       clone.add("days", 1);
     }
   };

   Calendar.prototype.getWeek = function(day) {
     if (!this.week || day.day() === 0) {
       this.week = createElement("div", "week");
       this.month.appendChild(this.week);
     }
   };

   Calendar.prototype.drawDay = function(day) {
     var self = this;
     this.getWeek(day);

     //Outer Day
     var outer = createElement("div", this.getDayClass(day));
     outer.addEventListener("click", function() {
       self.openDay(this);
     });

     //Day Name
     var name = createElement("div", "day-name", day.format("ddd"));

     //Day Number
     var number = createElement("div", "day-number", day.format("DD"));

     //Day Number
     var month = createElement("div", "hidden", day.format("MM"));
     month.setAttribute('month', day.format("MM"));

     //Day Number
     var year = createElement("div", "hidden", day.format("YYYY"));
     year.setAttribute('year', day.format("YYYY"));

     //Events
     var events = createElement("div", "day-events");
     this.drawEvents(day, events);

     outer.appendChild(name);
     outer.appendChild(number);
     outer.appendChild(month);
     outer.appendChild(year);
     outer.appendChild(events);
     this.week.appendChild(outer);
   };

   Calendar.prototype.drawEvents = function(day, element) {
     if ( /*day.month() === this.current.month()*/ true) {
       var todaysEvents = this.events.reduce(function(memo, ev) {
         if (ev.date.isSame(day, "day")) {
           memo.push(ev);
         }
         return memo;
       }, []);

       todaysEvents.forEach(function(ev) {
         var evSpan = createElement("span", ev.color);
         element.appendChild(evSpan);
       });
     }
   };

   Calendar.prototype.getDayClass = function(day) {
     classes = ["day"];
     if (day.month() !== this.current.month()) {
       classes.push("other");
     } else if (today.isSame(day, "day")) {
       classes.push("today");
     }
     return classes.join(" ");
   };

   Calendar.prototype.openDay = function(el) {
     let details,
       dayNumber = +el.querySelectorAll(".day-number")[0].innerText ||
       +el.querySelectorAll(".day-number")[0].textContent,
       month = el.querySelector('[month]').innerHTML,
       year = el.querySelector('[year]').innerHTML,
       day = moment(year + '-' + month + '-' + dayNumber, "YYYY-MM-DD");

     var currentOpened = document.querySelector(".details");

     //Check to see if there is an open detais box on the current row
     if (currentOpened && currentOpened.parentNode === el.parentNode) {
       details = currentOpened;
       arrow = document.querySelector(".arrow");
     } else {
       //Close the open events on differnt week row
       //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
       if (currentOpened) {
         currentOpened.addEventListener("webkitAnimationEnd", function() {
           currentOpened.parentNode.removeChild(currentOpened);
         });
         currentOpened.addEventListener("oanimationend", function() {
           currentOpened.parentNode.removeChild(currentOpened);
         });
         currentOpened.addEventListener("msAnimationEnd", function() {
           currentOpened.parentNode.removeChild(currentOpened);
         });
         currentOpened.addEventListener("animationend", function() {
           currentOpened.parentNode.removeChild(currentOpened);
         });
         currentOpened.className = "details out";
       }

       //Create the Details Container
       details = createElement("div", "details in");

       //Create the arrow
       var arrow = createElement("div", "arrow");

       //Create the event wrapper

       details.appendChild(arrow);
       el.parentNode.appendChild(details);
     }

     var todaysEvents = this.events.reduce(function(memo, ev) {
       if (ev.date.isSame(day, "day") && ev.date.isSame(day, "month") && ev.date.isSame(day, "year")) {
         memo.push(ev);
       }
       return memo;
     }, []);

     this.renderEvents(todaysEvents, details);

     arrow.style.left = el.offsetLeft + el.offsetWidth / 2 + -4 - el.parentNode.offsetLeft + "px";
   };

   Calendar.prototype.renderEvents = function(events, ele) {
     //Remove any events in the current details element
     var currentWrapper = ele.querySelector(".events");
     var wrapper = createElement(
       "div",
       "events in" + (currentWrapper ? " new" : "")
     );

     events.forEach(function(ev) {
       let div = createElement("div", "event"),
         square = createElement("div", "event-category " + ev.color),
         titleSpan = createElement("span", "", ev.eventName),
         timeSpan = createElement("span", "time " + ev.color, moment(ev.eventFrom || 0, "YYYY-MM-DD HH:mm:ss").format('hh:mm A') + ' - ' + moment(ev.eventTo || 0, "YYYY-MM-DD HH:mm:ss").format('hh:mm A')),
         locationSpan = createElement("span", "location", ev.location || 'Multi-Purpose Hall');

       div.appendChild(square);
       div.appendChild(titleSpan);
       div.appendChild(timeSpan);
       div.innerHTML += '<br>';
       div.appendChild(locationSpan);
       wrapper.appendChild(div);
     });

     if (!events.length) {
       var div = createElement("div", "event empty");
       var titleSpan = createElement("span", "", "No Events");

       div.appendChild(titleSpan);
       wrapper.appendChild(div);
     }

     if (currentWrapper) {
       currentWrapper.className = "events out";
       currentWrapper.addEventListener("webkitAnimationEnd", function() {
         currentWrapper.parentNode.removeChild(currentWrapper);
         ele.appendChild(wrapper);
       });
       currentWrapper.addEventListener("oanimationend", function() {
         currentWrapper.parentNode.removeChild(currentWrapper);
         ele.appendChild(wrapper);
       });
       currentWrapper.addEventListener("msAnimationEnd", function() {
         currentWrapper.parentNode.removeChild(currentWrapper);
         ele.appendChild(wrapper);
       });
       currentWrapper.addEventListener("animationend", function() {
         currentWrapper.parentNode.removeChild(currentWrapper);
         ele.appendChild(wrapper);
       });
     } else {
       ele.appendChild(wrapper);
     }
   };

   Calendar.prototype.drawLegend = function() {
     if (document.getElementsByClassName('legend').length)
       return;

     var legend = createElement("div", "legend new");
     var calendars = this.events
       .map(function(e) {
         return e.calendar + "|" + e.color;
       })
       .reduce(function(memo, e) {
         if (memo.indexOf(e) === -1) {
           memo.push(e);
         }
         return memo;
       }, [])
       .forEach(function(e) {
         var parts = e.split("|");
         var entry = createElement("span", "entry " + parts[1], parts[0]);
         legend.appendChild(entry);
       });
     this.el.appendChild(legend);
   };

   Calendar.prototype.nextMonth = function() {
     this.current.add("months", 1);
     this.next = true;
     this.draw();
   };

   Calendar.prototype.prevMonth = function() {
     this.current.subtract("months", 1);
     this.next = false;
     this.draw();
   };

   function createElement(tagName, className, innerText) {
     var ele = document.createElement(tagName);
     if (className) {
       ele.className = className;
     }
     if (innerText) {
       ele.innderText = ele.textContent = innerText;
     }
     return ele;
   }
   return Calendar;
 })();
