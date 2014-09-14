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
    id: "vertiCal",                                                                                                    // 6
    "class": "row"                                                                                                     // 7
  }, "\n    ", Spacebars.include(view.lookupTemplate("vertiCalDefaultHeader")), "\n    ", HTML.DIV({                   // 8
    "class": "btn-group-vertical btn-block"                                                                            // 9
  }, "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultUpArrow")), "\n      ", Blaze.Each(function() { // 10
    return Spacebars.call(view.lookup("dates"));                                                                       // 11
  }, function() {                                                                                                      // 12
    return [ "\n        ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDateContent")), "\n      " ];         // 13
  }), "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDownArrow")), "\n    "), "\n  ");              // 14
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
Template.__checkName("vertiCalDefaultFooter");                                                                         // 51
Template["vertiCalDefaultFooter"] = new Template("Template.vertiCalDefaultFooter", (function() {                       // 52
  var view = this;                                                                                                     // 53
  return "";                                                                                                           // 54
}));                                                                                                                   // 55
                                                                                                                       // 56
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
Template.vertiCal.dates = function(){                                                                                  // 7
  var num = this.numDays ? this.numDays : 7;                                                                           // 8
  var indexs = [];                                                                                                     // 9
  for( i = 0; i < num; i++ ){                                                                                          // 10
    indexs.push(i);                                                                                                    // 11
  }                                                                                                                    // 12
  return indexs;                                                                                                       // 13
}                                                                                                                      // 14
                                                                                                                       // 15
Template.vertiCalDefaultHeader.text = function(){                                                                      // 16
  return moment(Session.get("vertiCalStartDate")).format('MMMM YYYY');                                                 // 17
}                                                                                                                      // 18
                                                                                                                       // 19
Template.vertiCalDefaultDateContent.active = function(){                                                               // 20
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                                  // 21
  var selected = Session.get("vertiCalSelectedDate");                                                                  // 22
  return current.isSame(selected,"day") ? "active" : "";                                                               // 23
}                                                                                                                      // 24
                                                                                                                       // 25
Template.vertiCalDefaultDateContent.text = function(){                                                                 // 26
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                                  // 27
  var start = moment(Session.get("vertiCalStartDate"));                                                                // 28
  return current.isSame(start,"month") ? current.format("Do") : current.format("MMM Do");                              // 29
}                                                                                                                      // 30
                                                                                                                       // 31
Template.vertiCalDefaultDateContent.events({                                                                           // 32
  'click': function(event){                                                                                            // 33
    Session.set("vertiCalSelectedDate",                                                                                // 34
        moment(Session.get("vertiCalStartDate")).add(parseInt(this),'days').format("MM/DD/YYYY")                       // 35
    );                                                                                                                 // 36
  }                                                                                                                    // 37
});                                                                                                                    // 38
                                                                                                                       // 39
Template.vertiCalDefaultUpArrow.events({                                                                               // 40
  'click': function(event){                                                                                            // 41
    var newDate = moment(Session.get('vertiCalStartDate')).add(-1,'days');                                             // 42
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY'));                                                    // 43
  }                                                                                                                    // 44
});                                                                                                                    // 45
                                                                                                                       // 46
Template.vertiCalDefaultDownArrow.events({                                                                             // 47
  'click': function(event){                                                                                            // 48
    var newDate = moment(Session.get('vertiCalStartDate')).add(1,'days');                                              // 49
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY') );                                                   // 50
  }                                                                                                                    // 51
});                                                                                                                    // 52
                                                                                                                       // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
