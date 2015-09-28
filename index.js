module.exports = {
  activate: function (state) {
    atom.commands.add('atom-workspace', 'npm-init:empty', initEmpty)
  }
}

function initEmpty () {
  var fs = require('fs')
  var path = require('path')
  var editor = atom.workspace.getActiveTextEditor()
  var projectPath = atom.project.getPaths()[0]
  var dirname = editor ? path.dirname(editor.getPath()) : projectPath
  var packagePath = path.join(dirname, 'package.json')
  var emptyPackageJson = {
    name: '',
    version: '0.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'npm test'
    },
    repository: {
      type: 'git',
      url: ''
    },
    keywords: [],
    author: '',
    license: 'ISC',
    dependencies: {},
    devDependencies: {}
  }

  fs.exists(packagePath, function (exists) {
    if (!exists) {
      fs.writeFile(packagePath, JSON.stringify(emptyPackageJson, null, 2),
      function (err) {
        if (err) throw err
        // success
      })
    }
  })
}
