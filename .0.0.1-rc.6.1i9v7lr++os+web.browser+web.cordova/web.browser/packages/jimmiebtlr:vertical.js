(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/jimmiebtlr:vertical/template.vertiCal.js                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("vertiCal");                                                                                   // 2
Template["vertiCal"] = new Template("Template.vertiCal", (function() {                                              // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    id: "vertiCal"                                                                                                  // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    "class": "hidden-sm hidden-xs"                                                                                  // 8
  }, "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultHeader")), "\n      ", HTML.DIV({            // 9
    id: "vertiCalScrollable",                                                                                       // 10
    "class": "btn-group-vertical btn-block"                                                                         // 11
  }, "\n        ", Spacebars.include(view.lookupTemplate("vertiCalDefaultUpArrow")), "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("dates"));                                                                    // 13
  }, function() {                                                                                                   // 14
    return [ "\n          ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDateContent")), "\n        " ];  // 15
  }), "\n        ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDownArrow")), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("vertiCalJumpToToday")), "\n    "), "\n    ", Spacebars.include(view.lookupTemplate("vertiCalJumpToDate")), "\n  ");
}));                                                                                                                // 17
                                                                                                                    // 18
Template.__checkName("vertiCalDefaultHeader");                                                                      // 19
Template["vertiCalDefaultHeader"] = new Template("Template.vertiCalDefaultHeader", (function() {                    // 20
  var view = this;                                                                                                  // 21
  return HTML.DIV({                                                                                                 // 22
    "class": "vertiCalHeader text-center"                                                                           // 23
  }, "\n    ", HTML.H4(Blaze.View(function() {                                                                      // 24
    return Spacebars.mustache(view.lookup("text"));                                                                 // 25
  })), "\n  ");                                                                                                     // 26
}));                                                                                                                // 27
                                                                                                                    // 28
Template.__checkName("vertiCalDefaultUpArrow");                                                                     // 29
Template["vertiCalDefaultUpArrow"] = new Template("Template.vertiCalDefaultUpArrow", (function() {                  // 30
  var view = this;                                                                                                  // 31
  return HTML.Raw('<div class="btn btn-default vertiCalControl">\n    <i class="fa fa-sort-asc fa-fw"></i>\n  </div>');
}));                                                                                                                // 33
                                                                                                                    // 34
Template.__checkName("vertiCalDefaultDateContent");                                                                 // 35
Template["vertiCalDefaultDateContent"] = new Template("Template.vertiCalDefaultDateContent", (function() {          // 36
  var view = this;                                                                                                  // 37
  return HTML.DIV({                                                                                                 // 38
    "class": function() {                                                                                           // 39
      return [ "btn btn-default ", Spacebars.mustache(view.lookup("active")), " text-center" ];                     // 40
    }                                                                                                               // 41
  }, "\n    ", Blaze.View(function() {                                                                              // 42
    return Spacebars.mustache(view.lookup("text"));                                                                 // 43
  }), "\n  ");                                                                                                      // 44
}));                                                                                                                // 45
                                                                                                                    // 46
Template.__checkName("vertiCalDefaultDownArrow");                                                                   // 47
Template["vertiCalDefaultDownArrow"] = new Template("Template.vertiCalDefaultDownArrow", (function() {              // 48
  var view = this;                                                                                                  // 49
  return HTML.Raw('<div class="btn btn-default vertiCalControl">\n    <i class="fa fa-sort-desc fa-fw"></i>\n  </div>');
}));                                                                                                                // 51
                                                                                                                    // 52
Template.__checkName("vertiCalJumpToToday");                                                                        // 53
Template["vertiCalJumpToToday"] = new Template("Template.vertiCalJumpToToday", (function() {                        // 54
  var view = this;                                                                                                  // 55
  return HTML.Raw('<div id="vertiCalJumpToToday" class="btn btn-default btn-block">\n    Jump to Today\n  </div>'); // 56
}));                                                                                                                // 57
                                                                                                                    // 58
Template.__checkName("vertiCalJumpToDate");                                                                         // 59
Template["vertiCalJumpToDate"] = new Template("Template.vertiCalJumpToDate", (function() {                          // 60
  var view = this;                                                                                                  // 61
  return HTML.DIV({                                                                                                 // 62
    "class": "btn-block btn-group-vertical input-group-vertical"                                                    // 63
  }, "\n    ", HTML.INPUT({                                                                                         // 64
    id: "jumpToDateInput",                                                                                          // 65
    "class": "form-control",                                                                                        // 66
    value: function() {                                                                                             // 67
      return Spacebars.mustache(view.lookup("value"));                                                              // 68
    },                                                                                                              // 69
    type: "date"                                                                                                    // 70
  }), HTML.Raw('\n    <input id="jumpToDateSubmit" type="submit" class="btn btn-default" value="Jump">\n  '));      // 71
}));                                                                                                                // 72
                                                                                                                    // 73
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/jimmiebtlr:vertical/vertiCal.js                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.vertiCal.created = function(){                                                                             // 1
  if( Session.get('vertiCalStartDate') === undefined ){                                                             // 2
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );                                               // 3
  }                                                                                                                 // 4
}                                                                                                                   // 5
                                                                                                                    // 6
Template.vertiCal.rendered = function(){                                                                            // 7
  $('#vertiCalScrollable').bind('mousewheel',function(event){                                                       // 8
    if (event.originalEvent.wheelDelta >= 0) {                                                                      // 9
      Session.set('vertiCalStartDate',                                                                              // 10
        moment(Session.get("vertiCalStartDate")).add(-1, 'days').format('MM/DD/YYYY')                               // 11
      );                                                                                                            // 12
    }                                                                                                               // 13
    else {                                                                                                          // 14
      Session.set('vertiCalStartDate',                                                                              // 15
        moment(Session.get("vertiCalStartDate")).add(1, 'days').format('MM/DD/YYYY')                                // 16
      );                                                                                                            // 17
    }                                                                                                               // 18
    event.preventDefault();                                                                                         // 19
  });                                                                                                               // 20
}                                                                                                                   // 21
                                                                                                                    // 22
Template.vertiCal.dates = function(){                                                                               // 23
  var num = this.numDays ? this.numDays : 7;                                                                        // 24
  var indexs = [];                                                                                                  // 25
  for( i = 0; i < num; i++ ){                                                                                       // 26
    indexs.push(i);                                                                                                 // 27
  }                                                                                                                 // 28
  return indexs;                                                                                                    // 29
}                                                                                                                   // 30
                                                                                                                    // 31
Template.vertiCalDefaultHeader.text = function(){                                                                   // 32
  return moment(Session.get("vertiCalStartDate")).format('MMMM YYYY');                                              // 33
}                                                                                                                   // 34
                                                                                                                    // 35
Template.vertiCalDefaultDateContent.active = function(){                                                            // 36
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                               // 37
  var selected = Session.get("vertiCalSelectedDate");                                                               // 38
  return current.isSame(selected,"day") ? "active" : "";                                                            // 39
}                                                                                                                   // 40
                                                                                                                    // 41
Template.vertiCalDefaultDateContent.text = function(){                                                              // 42
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                               // 43
  var start = moment(Session.get("vertiCalStartDate"));                                                             // 44
  return current.isSame(start,"month") ? current.format("Do") : current.format("MMM Do");                           // 45
}                                                                                                                   // 46
                                                                                                                    // 47
Template.vertiCalDefaultDateContent.events({                                                                        // 48
  'click': function(event){                                                                                         // 49
    Session.set("vertiCalSelectedDate",                                                                             // 50
        moment(Session.get("vertiCalStartDate")).add(parseInt(this),'days').format("MM/DD/YYYY")                    // 51
    );                                                                                                              // 52
  }                                                                                                                 // 53
});                                                                                                                 // 54
                                                                                                                    // 55
Template.vertiCalDefaultUpArrow.events({                                                                            // 56
  'click': function(event){                                                                                         // 57
    var newDate = moment(Session.get('vertiCalStartDate')).add(-1,'days');                                          // 58
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY'));                                                 // 59
  }                                                                                                                 // 60
});                                                                                                                 // 61
                                                                                                                    // 62
Template.vertiCalDefaultDownArrow.events({                                                                          // 63
  'click': function(event){                                                                                         // 64
    var newDate = moment(Session.get('vertiCalStartDate')).add(1,'days');                                           // 65
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY') );                                                // 66
  }                                                                                                                 // 67
});                                                                                                                 // 68
                                                                                                                    // 69
Template.vertiCalJumpToToday.events({                                                                               // 70
  'click #vertiCalJumpToToday': function(event){                                                                    // 71
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );                                               // 72
    Session.set("vertiCalSelectedDate", moment().format('MM/DD/YYYY') );                                            // 73
  }                                                                                                                 // 74
});                                                                                                                 // 75
                                                                                                                    // 76
Template.vertiCalJumpToDate.value = function(){                                                                     // 77
  return Session.get('vertiCalStartDate');                                                                          // 78
}                                                                                                                   // 79
                                                                                                                    // 80
Template.vertiCalJumpToDate.events({                                                                                // 81
  'click #jumpToDateSubmit': function(event ){                                                                      // 82
    console.log($('#jumpToDateInput').val() );                                                                      // 83
    Session.set('vertiCalStartDate', moment($('#jumpToDateInput').val()).format('MM/DD/YYYY') );                    // 84
    Session.set("vertiCalSelectedDate", moment($('#jumpToDateInput').val()).format('MM/DD/YYYY') );                 // 85
  }                                                                                                                 // 86
});                                                                                                                 // 87
                                                                                                                    // 88
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
