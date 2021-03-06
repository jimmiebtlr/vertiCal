Package.describe({
  summary: "Vertical Calendar plugin for meteor ",
  version: "0.0.1",
  git: "https://github.com/jimmiebtlr/vertiCal.git"
});

Package.onUse(function(api) {
  api.use(['templating','mrt:moment@2.6.0'],'client');
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles(['vertiCal.html','vertiCal.js','vertiCal.css'],'client');
  api.export('VertiCal','client');
});
