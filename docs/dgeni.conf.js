var path = require('canonical-path');
var ngdoc = require('dgeni-packages/ngdoc');

module.exports = function(config) {


  // Set logging level
  config.set('logging.level', 'debug');

  // Use ngdoc
  config = ngdoc(config);

  // Use the jsdoc extractor instead of the default to parse the function name.
//  config.set('source.extractors', [
//    require('dgeni-packages/ngdoc/extractors/ngdoc.js')
//  ]);

  /*
   * Add a couple of processors to the pipe to do extra parsing and rendering.
   *
   * add-toc: Add the table of contents.
   */
  config.append('processing.processors', [
    //require('./processors/add-toc')
  ]);

  // Configure the tags that will be parsed from the jsDoc.
  //var tagDefs = require('dgeni-packages/ngdoc/tag-defs');
//  config.set('processing.tagDefinitions', tagDefs);

  // Add your own templates to render docs
  config.prepend('rendering.templateFolders', [
    path.resolve(__dirname, 'templates')
  ]);

  // You can specifiy which tempate should be used based on a pattern.
  // Currently we just use one template and don't need a pattern
  config.prepend('rendering.templatePatterns', [
    '{ $doc.template }.template.md'
  ]);

  // This tells dgeni where to look for stuff
  config.set('source.projectPath', '.');

  config.set('source.files', [
    {
      // Process all js files in src/.
      pattern: 'src/**/*.js',
      // Some processors use the relative path of the source file to compute properties, such as
      // the outputPath. The basePath allows us to ensure that the "relative" path to each source
      // file is accurate no matter where the source files are relative to the projectPath.
      basePath: path.resolve(__dirname, '..')
    }
  ]);

  // Our generated docs will be written here:
  config.set('rendering.outputFolder', '../build/');
  // The contentsFolder is the path relative to the outputFolder, which identifies the place where
  // the "standard" content files are stored.  For example, in the AngularJS application, the output
  // folder is `build/docs` but the way that the application is stored, means that we want the
  // content files (i.e. the files that contain the content of each "doc") to be stored in
  // `build/docs/partials`
  config.set('rendering.contentsFolder', 'docs');

  return config;
};