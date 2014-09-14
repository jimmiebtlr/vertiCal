vertiCal
========

A simple vertical calendar package for meteor.

    meteor add jimmiebtlr:vertical

It can be added using the following template.

    {{> vertiCal}}

The number of days shown can be controlled by passing numDays to the template.

    {{> vertiCal numDays=30}}

The currently selected date can be accessed using.

    Session.get('vertiCalSelectedDate');

and can be set through the same variable.

    Session.set('vertiCalSelectedDate',moment().format('MM/DD/YYYY');
