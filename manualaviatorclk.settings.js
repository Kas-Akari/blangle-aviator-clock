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
    'ICAO Airport': function() {
      require("textinput").input({
        text: settings.icao || '',
        prompt: "ICAO (4 chars)"
      }).then(v => {
        if (v === undefined) return;

        v = v.toUpperCase().trim().replace(/[^A-Z0-9]/g, '').slice(0, 4);
        if (v.length !== 4) {
          E.showMessage("ICAO invalid");
          setTimeout(() => E.showMenu(menu), 1000);
          return;
        }

        settings.icao = v;
        writeSettings();
        E.showMenu(menu);
      });
    },
  };

  E.showMenu(menu);
})
