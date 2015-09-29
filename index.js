var path = require('path')

module.exports = {
  activate: function (state) {
    atom.commands.add('atom-workspace', 'npm-init:empty', initEmpty),
    atom.commands.add('atom-workspace', 'npm-init:default', initDefault)
  }
}

function initEmpty () {
  init({
    dependencies: {}
  })
}

function initDefault () {
  var projectName = path.basename(getProjectPath())
  init({
    name: projectName,
    version: '0.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    repository: {
      type: 'git',
      url: ''
    },
    keywords: [],
    author: '',
    license: 'MIT',
    dependencies: {},
    devDependencies: {}
  })
}

function getProjectPath() {
  var editor = atom.workspace.getActiveTextEditor()
  var projectPath = atom.project.getPaths()[0]
  return editor ? path.dirname(editor.getPath()) : projectPath
}

function init (packageInfo) {
  var fs = require('fs')
  var packagePath = path.join(getProjectPath(), 'package.json')

  fs.exists(packagePath, function (exists) {
    if (!exists) {
      fs.writeFile(packagePath, JSON.stringify(packageInfo, null, 2), function (err) {
        if (err) throw err
        // success
      })
    }
  })
}
