(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/jimmiebtlr:vertical/template.vertiCal.js                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("vertiCal");                                                                          // 2
Template["vertiCal"] = new Template("Template.vertiCal", (function() {                                     // 3
  var view = this;                                                                                         // 4
  return HTML.DIV({                                                                                        // 5
    id: "vertiCal"                                                                                         // 6
  }, "\n    ", Spacebars.include(view.lookupTemplate("vertiCalDefaultHeader")), "\n    ", Spacebars.include(view.lookupTemplate("vertiCalDefaultUpArrow")), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("dates"));                                                           // 8
  }, function() {                                                                                          // 9
    return [ "\n      ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDateContent")), "\n    " ]; // 10
  }), "\n    ", Spacebars.include(view.lookupTemplate("vertiCalDefaultDownArrow")), "\n  ");               // 11
}));                                                                                                       // 12
                                                                                                           // 13
Template.__checkName("vertiCalDefaultHeader");                                                             // 14
Template["vertiCalDefaultHeader"] = new Template("Template.vertiCalDefaultHeader", (function() {           // 15
  var view = this;                                                                                         // 16
  return HTML.DIV({                                                                                        // 17
    "class": "vertiCalHeader text-center"                                                                  // 18
  }, "\n    ", HTML.H4(Blaze.View(function() {                                                             // 19
    return Spacebars.mustache(view.lookup("text"));                                                        // 20
  })), "\n  ");                                                                                            // 21
}));                                                                                                       // 22
                                                                                                           // 23
Template.__checkName("vertiCalDefaultUpArrow");                                                            // 24
Template["vertiCalDefaultUpArrow"] = new Template("Template.vertiCalDefaultUpArrow", (function() {         // 25
  var view = this;                                                                                         // 26
  return HTML.Raw('<div class="vertiCalControl vertiCalControlTop">\n    <i class="fa fa-sort-asc fa-fw"></i>\n  </div>');
}));                                                                                                       // 28
                                                                                                           // 29
Template.__checkName("vertiCalDefaultDateContent");                                                        // 30
Template["vertiCalDefaultDateContent"] = new Template("Template.vertiCalDefaultDateContent", (function() { // 31
  var view = this;                                                                                         // 32
  return HTML.DIV({                                                                                        // 33
    "class": function() {                                                                                  // 34
      return [ "vertiCalElement ", Spacebars.mustache(view.lookup("active")), " text-center" ];            // 35
    }                                                                                                      // 36
  }, "\n    ", Blaze.View(function() {                                                                     // 37
    return Spacebars.mustache(view.lookup("text"));                                                        // 38
  }), "\n  ");                                                                                             // 39
}));                                                                                                       // 40
                                                                                                           // 41
Template.__checkName("vertiCalDefaultDownArrow");                                                          // 42
Template["vertiCalDefaultDownArrow"] = new Template("Template.vertiCalDefaultDownArrow", (function() {     // 43
  var view = this;                                                                                         // 44
  return HTML.Raw('<div class="vertiCalControl vertiCalControlBottom">\n    <i class="fa fa-sort-desc fa-fw"></i>\n  </div>');
}));                                                                                                       // 46
                                                                                                           // 47
Template.__checkName("vertiCalDefaultFooter");                                                             // 48
Template["vertiCalDefaultFooter"] = new Template("Template.vertiCalDefaultFooter", (function() {           // 49
  var view = this;                                                                                         // 50
  return "";                                                                                               // 51
}));                                                                                                       // 52
                                                                                                           // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/jimmiebtlr:vertical/vertiCal.js                                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
Template.vertiCal.created = function(){                                                                    // 1
  if( Session.get('vertiCalStartDate') === undefined ){                                                    // 2
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );                                      // 3
  }                                                                                                        // 4
}                                                                                                          // 5
                                                                                                           // 6
Template.vertiCal.dates = function(){                                                                      // 7
  var num = this.numDays ? this.numDays : 7;                                                               // 8
  var indexs = [];                                                                                         // 9
  for( i = 0; i < num; i++ ){                                                                              // 10
    indexs.push(i);                                                                                        // 11
  }                                                                                                        // 12
  return indexs;                                                                                           // 13
}                                                                                                          // 14
                                                                                                           // 15
Template.vertiCalDefaultHeader.text = function(){                                                          // 16
  return moment(Session.get("vertiCalStartDate")).format('MMMM YYYY');                                     // 17
}                                                                                                          // 18
                                                                                                           // 19
Template.vertiCalDefaultDateContent.active = function(){                                                   // 20
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                      // 21
  var selected = Session.get("vertiCalSelectedDate");                                                      // 22
  return current.isSame(selected,"day") ? "active" : "";                                                   // 23
}                                                                                                          // 24
                                                                                                           // 25
Template.vertiCalDefaultDateContent.text = function(){                                                     // 26
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');                      // 27
  var start = moment(Session.get("vertiCalStartDate"));                                                    // 28
  return current.isSame(start,"month") ? current.format("Do") : current.format("MMM Do");                  // 29
}                                                                                                          // 30
                                                                                                           // 31
Template.vertiCalDefaultDateContent.events({                                                               // 32
  'click': function(event){                                                                                // 33
    Session.set("vertiCalSelectedDate",                                                                    // 34
        moment(Session.get("vertiCalStartDate")).add(parseInt(this),'days').format("MM/DD/YYYY")           // 35
    );                                                                                                     // 36
  }                                                                                                        // 37
});                                                                                                        // 38
                                                                                                           // 39
Template.vertiCalDefaultUpArrow.events({                                                                   // 40
  'click': function(event){                                                                                // 41
    var newDate = moment(Session.get('vertiCalStartDate')).add(-1,'days');                                 // 42
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY'));                                        // 43
  }                                                                                                        // 44
});                                                                                                        // 45
                                                                                                           // 46
Template.vertiCalDefaultDownArrow.events({                                                                 // 47
  'click': function(event){                                                                                // 48
    var newDate = moment(Session.get('vertiCalStartDate')).add(1,'days');                                  // 49
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY') );                                       // 50
  }                                                                                                        // 51
});                                                                                                        // 52
                                                                                                           // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
