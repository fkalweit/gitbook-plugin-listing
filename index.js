var fs = require('fs');
var Q = require('q');
var htmlencode = require('htmlencode');
var path = require('path');
const execSync = require('child_process').execSync;
var _counter = 1;
var _currentPage;

module.exports = {
  website: {
    assets: "./assets"
  },

  hooks: {
    "page:before": function(page) {
      _currentPage = page;
      return page;
    }
  },

  blocks: {
      listing: {
        process: function(block) {

          if (this.generator === 'website') {
            var id = 'listing-' + _counter++;
            var config = block.kwargs;
            var display = config.display || 'both';
            var separator = config.separator || 'Output: <br>';
            var fullPath = path.resolve(path.dirname(_currentPage.rawPath), config.src);

            var settings = {
              readOnly: config.readOnly || false,
              language: config.language || 'bash',
              id: id
            };

            // Read the file
            return Q.nfcall(fs.readFile, fullPath, "utf-8")
              .then(function(data) {



                var tmpStr = data.split("\n");
                var data = "";
                for (var i = 0; i < tmpStr.length; i++) {
                     data = data +  tmpStr[i] +  "\n" ;
                }
                console.log("display: "+ display);
                var editor = '<pre><code class="lang-'+settings.language+' ">'+ data +'</code></pre>'
                var output = '';
                if (display === 'listing' || display === 'both'){
                  output += editor;
                  console.log("listing");
                }
                if (display === 'both'){
                  output += separator;
                }
                if (display === 'run' || display === 'both'){
                  var run;
                  if (settings.language == "cpp" || settings.language == "c++" || settings.language == "hpp") {
                     execSync("g++ "+ fullPath + " -o  out/out_cpp_"+settings.id);
                     path.resolve(path.dirname(_currentPage.rawPath), "out/out_cpp_"+settings.id)
                     run  = execSync(path.resolve(path.dirname(_currentPage.rawPath), "out/out_cpp_"+settings.id)).toString();
                  }
                  else if (settings.language == "typescript" || settings.language == "ts") {
                    execSync("tsc "+ fullPath + " --outFile  out/out_"+settings.id+".js");
                    path.resolve(path.dirname(_currentPage.rawPath), "out/out_"+settings.id+".js");
                    execSync("chmod +x out/*");
                    run  = execSync(path.resolve(path.dirname(_currentPage.rawPath), "out/out_"+settings.id+".js")).toString();
                  }
                  else {
                    run  = execSync(config.src).toString();
                  }
                  run = '<pre><blockquote>'+run+'</blockquote></pre>';
                  output += run;
                }

                return output;
              });
          }
          else {
            return '';
          }
        }
      }
  }

};
