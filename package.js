Package.describe({
  summary: "Vertical Calendar plugin for meteor ",
  version: "0.0.1-rc.1",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.use(['templating'],'client');
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles(['vertiCal.html','vertiCal.js','vertiCal.css'],'client');
});