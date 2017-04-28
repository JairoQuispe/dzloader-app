var shell = require('electron').shell;
var remote = require('electron').remote;
var dialog = remote.dialog;
var packageFile = remote.require('./package.json');

(function () {
  //open links externally by default
  $(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
  });

  // Open DevTools when F12 is pressed
  document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
      remote.getCurrentWindow().toggleDevTools();
    }
  });

  $('#openDownloadsFolder').on('click', function () {
    shell.showItemInFolder(remote.require('./app').mainFolder + '/.');
  });

  // Function to make title-bar work
  function initTitleBar() {
    var $mainEl = $('#title-bar');
    const window = remote.getCurrentWindow();

    $mainEl.find('#application_version').text(packageFile.version);

    $mainEl.find('#min-btn').on('click', function () {
      window.minimize();
    });

    $mainEl.find('#max-btn').on('click', function () {
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
    });

    $mainEl.find('#close-btn').on('click', function () {
      window.close();
    });
  }

  // Ready state of the page
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initTitleBar();

      $('#modal_settings_input_downloadTracksLocation').on('click', function () {
        $(this).val(dialog.showOpenDialog({
          properties: ['openDirectory']
        }));
      });
    }
  };
})();