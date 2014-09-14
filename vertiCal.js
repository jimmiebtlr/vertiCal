Template.vertiCal.created = function(){
  if( Session.get('vertiCalStartDate') === undefined ){
    Session.set('vertiCalStartDate', moment().format('MM/DD/YYYY') );
  }
}

Template.vertiCal.dates = function(){
  var num = this.number ? this.number : 7;
  var indexs = [];
  for( i = 0; i < num; i++ ){
    indexs.push(i);
  }
  return indexs;
}

Template.vertiCalDefaultHeader.text = function(){
  return moment(Session.get("vertiCalStartDate")).format('MMMM YYYY');
}

Template.vertiCalDefaultDateContent.active = function(){
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');
  var selected = Session.get("vertiCalSelectedDate");
  return current.isSame(selected,"day") ? "active" : "";
}

Template.vertiCalDefaultDateContent.text = function(){
  var current = moment(Session.get("vertiCalStartDate")).add(parseInt(this), 'days');
  var start = moment(Session.get("vertiCalStartDate"));
  return current.isSame(start,"month") ? current.format("Do") : current.format("MMM Do");
}

Template.vertiCalDefaultDateContent.events({
  'click': function(event){
    Session.set("vertiCalSelectedDate", 
        moment(Session.get("vertiCalStartDate")).add(parseInt(this),'days').format("MM/DD/YYYY")
    );
  }
});

Template.vertiCalDefaultUpArrow.events({
  'click': function(event){
    var newDate = moment(Session.get('vertiCalStartDate')).add(-1,'days');
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY'));
  }
});

Template.vertiCalDefaultDownArrow.events({
  'click': function(event){
    var newDate = moment(Session.get('vertiCalStartDate')).add(1,'days');
    Session.set('vertiCalStartDate', newDate.format('MM/DD/YYYY') );
  }
});