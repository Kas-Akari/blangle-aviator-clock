(function(back) {
  var FILE = "manualaviatorclk.json";

  // Load settings
  var settings = Object.assign({
    icao: 'LEBA',
    showSeconds: true,
    invertScrolling: false,
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  // Show the menu
  var menu = {
    "" : { "title" : "AV8R Clock" },
    "< Back" : () => back(),
    'Show Seconds': {
      value: !!settings.showSeconds,  // !! converts undefined to false
      onchange: v => {
        settings.showSeconds = v;
        writeSettings();
      }
    },
    'Invert Scrolling': {
      value: !!settings.invertScrolling,  // !! converts undefined to false
      onchange: v => {
        settings.invertScrolling = v;
        writeSettings();
      }
    },
  };

  E.showMenu(menu);
})
