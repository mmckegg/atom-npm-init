module.exports = {
  activate: function (state) {
    atom.commands.add('atom-workspace', 'npm-init:empty', initEmpty)
  }
}

function initEmpty () {
  var fs = require('fs')
  var path = require('path')
  var editor = atom.workspace.getActiveTextEditor()
  var filename = editor.getPath()
  var dirname = path.dirname(filename)
  var packagePath = path.join(dirname, 'package.json')

  fs.exists(packagePath, function (exists) {
    if (!exists) {
      fs.writeFile(packagePath, JSON.stringify({
        dependencies: {}
      }, null, 2), function (err) {
        if (err) throw err
        // success
      })
    }
  })
}
