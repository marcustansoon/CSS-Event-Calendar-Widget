# CSS-Event-Calendar-Widget
### ![#00f7ff](https://via.placeholder.com/15/00f7ff/000000?text=+) HTML/CSS Event Calendar UI Widget (Modified & Improved version)

#### ![#00ff5e](https://via.placeholder.com/15/00ff5e/000000/?text=+) Sample Usage
```html
/* Mobile friendly */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Import custom font family, calendar stylesheet */
<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700" rel="stylesheet">
<link rel="stylesheet" href="https://raw.githack.com/marcustansoon/CSS-Event-Calendar-Widget/master/src/css/styles.css">

/* Import calendar JS, moment JS */
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script>
<script src="https://raw.githack.com/marcustansoon/CSS-Event-Calendar-Widget/master/src/js/eventCalendarWidget.min.js"></script>

<div id="calendar"></div>
```
```html
<script>
    // Init data
    var data = [{
        eventName: "Medical check-up",
        calendar: "Deep",
        color: "blue", //'blue','orange','green','yellow','red','coral','purple','lime','black' OR 'aqua'
        location: "General Hospital",
        eventFrom: "2020-07-27 16:30:00",
        eventTo: "2020-07-31 17:00:00",
      },
      {
        eventName: "Gaming time",
        calendar: "Hobby",
        color: "lime",
        location: "Cyber World",
        eventFrom: "2020-06-26 16:30:00",
        eventTo: "2020-06-26 17:00:00",
      },
      {
        eventName: "Workout",
        calendar: "gym",
        color: "coral",
        location: "Angelus Fitness",
        eventFrom: "2020-06-04 08:30:00",
        eventTo: "2020-06-05 10:30:00",
      }
    ];

    // Instantiate calendar 
    let calendar = new Calendar("#calendar", data);
</script>
```

#### ![#00ff5e](https://via.placeholder.com/15/00ff5e/000000/?text=+) Demo Link
[calendar-demo.html](https://raw.githack.com/marcustansoon/CSS-Event-Calendar-Widget/master/demo/demo.html)

<br>

<p align="center">
  <img src="https://i.imgur.com/TtbeoLu.png" width="350" title="CSS Calendar text">
</p>


#### ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Copyright Disclaimer: 
*I lay no claim as originator of any content or property featured here. All rights reserved to it's rightful owner/owner's. No copyright infringement intended.*

### ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) Credits to :
[@peanav](https://codepen.io/peanav/pens/)
<br>
[@christopherprins](https://codepen.io/christopherprins)
