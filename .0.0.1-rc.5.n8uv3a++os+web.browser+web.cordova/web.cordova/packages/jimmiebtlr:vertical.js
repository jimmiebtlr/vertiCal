(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/jimmiebtlr:vertical/template.vertiCal.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("vertiCal");                                                                                      // 2
Template["vertiCal"] = new Template("Template.vertiCal", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: "vertiCal"                                                                                                     // 6
  }, "\n    ", Spacebars.include(view.lookupTemplate("vertiCalDefaultHeader")), "\n    ", HTML.DIV({                   // 7
    id: "vertiCalScrollable",                                                                                          // 8
    "class": "btn-group-vertical btn-block"                                                                            // 9
  }, "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultUpArrow")), "\n      ", Blaze.Each(function() { // 10
    return Spacebars.call(view.lookup("dates"));                                                                       // 11
  }, function() {                                                                                                      // 12
    return [ "\n        ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDateContent")), "\n      " ];         // 13
  }), "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDownArrow")), "\n    "), "\n\n    ", Spacebars.include(view.lookupTemplate("vertiCalJumpToToday")), "\n    ", Spacebars.include(view.lookupTemplate("vertiCalJumpToDate")), "\n  ");
}));                                                                                                                   // 15
                                                                                                                       // 16
Template.__checkName("vertiCalDefaultHeader");                                                                         // 17
Template["vertiCalDefaultHeader"] = new Template("Template.vertiCalDefaultHeader", (function() {                       // 18
  var view = this;                                                                                                     // 19
  return HTML.DIV({                                                                                                    // 20
    "class": "vertiCalHeader text-center"                                                                              // 21
  }, "\n    ", HTML.H4(Blaze.View(function() {                                                                         // 22
    return Spacebars.mustache(view.lookup("text"));                                                                    // 23
  })), "\n  ");                                                                                                        // 24
}));                                                                                                                   // 25
                                                                                                                       // 26
Template.__checkName("vertiCalDefaultUpArrow");                                                                        // 27
Template["vertiCalDefaultUpArrow"] = new Template("Template.vertiCalDefaultUpArrow", (function() {                     // 28
  var view = this;                                                                                                     // 29
  return HTML.Raw('<div class="btn btn-default vertiCalControl">\n    <i class="fa fa-sort-asc fa-fw"></i>\n  </div>');
}));                                                                                                                   // 31
                                                                                                                       // 32
Template.__checkName("vertiCalDefaultDateContent");                                                                    // 33
Template["vertiCalDefaultDateContent"] = new Template("Template.vertiCalDefaultDateContent", (function() {             // 34
  var view = this;                                                                                                     // 35
  return HTML.DIV({                                                                                                    // 36
    "class": function() {                                                                                              // 37
      return [ "btn btn-default ", Spacebars.mustache(view.lookup("active")), " text-center" ];                        // 38
    }                                                                                                                  // 39
  }, "\n    ", Blaze.View(function() {                                                                                 // 40
    return Spacebars.mustache(view.lookup("text"));                                                                    // 41
  }), "\n  ");                                                                                                         // 42
}));                                                                                                                   // 43
                                                                                                                       // 44
Template.__checkName("vertiCalDefaultDownArrow");                                                                      // 45
Template["vertiCalDefaultDownArrow"] = new Template("Template.vertiCalDefaultDownArrow", (function() {                 // 46
  var view = this;                                                                                                     // 47
  return HTML.Raw('<div class="btn btn-default vertiCalControl">\n    <i class="fa fa-sort-desc fa-fw"></i>\n  </div>');
}));                                                                                                                   // 49
                                                                                                                       // 50
Template.__checkName("vertiCalJumpToToday");                                                                           // 51
Template["vertiCalJumpToToday"] = new Template("Template.vertiCalJumpToToday", (function() {                           // 52
  var view = this;                                                                                                     // 53
  return HTML.Raw('<div id="vertiCalJumpToToday" class="btn btn-default btn-block">\n    Jump to Today\n  </div>');    // 54
}));                                                                                                                   // 55
                                                                                                                       // 56
Template.__checkName("vertiCalJumpToDate");                                                                            // 57
Template["vertiCalJumpToDate"] = new Template("Template.vertiCalJumpToDate", (function() {                             // 58
  var view = this;                                                                                                     // 59
  return HTML.DIV({                                                                                                    // 60
    "class": "btn-block btn-group-vertical input-group-vertical"                                                       // 61
  }, "\n    ", HTML.INPUT({                                                                                            // 62
    id: "jumpToDateInput",                                                                                             // 63
    "class": "form-control",                                                                                           // 64
    value: function() {                                                                                                // 65
      return Spacebars.mustache(view.lookup("value"));                                                                 // 66
    },                                                                                                                 // 67
    type: "date"                                                                                                       // 68
  }), HTML.Raw('\n    <input id="jumpToDateSubmit" type="submit" class="btn btn-default" value="Jump">\n  '));         // 69
}));                                                                                                                   // 70
                                                                                                                       // 71
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/jimmiebtlr:vertical/vertiCal.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.vertiCal.created = function(){                                                                                // 1
  if( Session.get('vertiCalStartDate') === undefined ){                                                                // 2
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );                                                  // 3
  }                                                                                                                    // 4
}                                                                                                                      // 5
                                                                                                                       // 6
Template.vertiCal.rendered = function(){                                                                               // 7
  $('#vertiCalScrollable').bind('mousewheel',function(event){                                                          // 8
    if (event.originalEvent.wheelDelta >= 0) {                                                                         // 9
      Session.set('vertiCalStartDate',                                                                                 // 10
        moment(Session.get("vertiCalStartDate")).add(-1, 'days').format('MM/DD/YYYY')                                  // 11
      );                                                                                                               // 12
    }                                                                                                                  // 13
    else {                                                                                                             // 14
      Session.set('vertiCalStartDate',                                                                                 // 15
        moment(Session.get("vertiCalStartDate")).add(1, 'days').format('MM/DD/YYYY')                                   // 16
      );                                                                                                               // 17
    }                                                                                                                  // 18
    event.preventDefault();                                                                                            // 19
  });                                                                                                                  // 20
}                                                                                                                      // 21
                                                                                                                       // 22
Template.vertiCal.dates = function(){                                                                                  // 23
  var num = this.numDays ? this.numDays : 7;                                                                           // 24
  var indexs = [];                                                                                                     // 25
  for( i = 0; i < num; i++ ){                                                                                          // 26
    indexs.push(i);                                                                                                    // 27
  }                                                                                                                    // 28
  return indexs;                                                                                                       // 29
}                                                                                                                      // 30
                                                                                                                       // 31
Template.vertiCalDefaultHeader.text = function(){                                                                      // 32
  return moment(Session.get("vertiCalStartDate")).format('MMMM YYYY');                                                 // 33
}                                                                                                                      // 34
                                                                                                                       // 35
Template.vertiCalDefaultDateContent.active = function(){                                                               // 36
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                                  // 37
  var selected = Session.get("vertiCalSelectedDate");                                                                  // 38
  return current.isSame(selected,"day") ? "active" : "";                                                               // 39
}                                                                                                                      // 40
                                                                                                                       // 41
Template.vertiCalDefaultDateContent.text = function(){                                                                 // 42
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                                  // 43
  var start = moment(Session.get("vertiCalStartDate"));                                                                // 44
  return current.isSame(start,"month") ? current.format("Do") : current.format("MMM Do");                              // 45
}                                                                                                                      // 46
                                                                                                                       // 47
Template.vertiCalDefaultDateContent.events({                                                                           // 48
  'click': function(event){                                                                                            // 49
    Session.set("vertiCalSelectedDate",                                                                                // 50
        moment(Session.get("vertiCalStartDate")).add(parseInt(this),'days').format("MM/DD/YYYY")                       // 51
    );                                                                                                                 // 52
  }                                                                                                                    // 53
});                                                                                                                    // 54
                                                                                                                       // 55
Template.vertiCalDefaultUpArrow.events({                                                                               // 56
  'click': function(event){                                                                                            // 57
    var newDate = moment(Session.get('vertiCalStartDate')).add(-1,'days');                                             // 58
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY'));                                                    // 59
  }                                                                                                                    // 60
});                                                                                                                    // 61
                                                                                                                       // 62
Template.vertiCalDefaultDownArrow.events({                                                                             // 63
  'click': function(event){                                                                                            // 64
    var newDate = moment(Session.get('vertiCalStartDate')).add(1,'days');                                              // 65
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY') );                                                   // 66
  }                                                                                                                    // 67
});                                                                                                                    // 68
                                                                                                                       // 69
Template.vertiCalJumpToToday.events({                                                                                  // 70
  'click #vertiCalJumpToToday': function(event){                                                                       // 71
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );                                                  // 72
    Session.set("vertiCalSelectedDate", moment().format('MM/DD/YYYY') );                                               // 73
  }                                                                                                                    // 74
});                                                                                                                    // 75
                                                                                                                       // 76
Template.vertiCalJumpToDate.value = function(){                                                                        // 77
  return Session.get('vertiCalStartDate');                                                                             // 78
}                                                                                                                      // 79
                                                                                                                       // 80
Template.vertiCalJumpToDate.events({                                                                                   // 81
  'click #jumpToDateSubmit': function(event ){                                                                         // 82
    console.log($('#jumpToDateInput').val() );                                                                         // 83
    Session.set('vertiCalStartDate', moment($('#jumpToDateInput').val()).format('MM/DD/YYYY') );                       // 84
    Session.set("vertiCalSelectedDate", moment($('#jumpToDateInput').val()).format('MM/DD/YYYY') );                    // 85
  }                                                                                                                    // 86
});                                                                                                                    // 87
                                                                                                                       // 88
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
