var fs = require('fs');
var args = require('./config');

function Compile() {
    fs.readFile('./src/hello.birl', {encoding: 'utf-8'}, function (err, file) {
        var code = file;
        
        Object.keys(args).forEach(function (key) {
            var variables = [];
            
            if (key.indexOf("$") == -1) {
                code = code.replace(new RegExp(key, "g"), args[key]);
                return;   
            }
            
            var phrasex = key.replace(/(\$+.)/g, function (x) {
                variables.push(x);
                
                if (x.replace("$", "").indexOf("$") > -1) return '((\\w+|\\d+) |(\\w+|\\d+))(=|==|===|!=|!==|>|<|<=|>=|>>|><|<<|<>)( (\\w+|\\d+)|(\\w+|\\d+))'
                return '(((\w|\d|"(.*?)")+, )+(\w|\d|"(.*?)")+|((\w|\d|"(.*?)")+,)+(\w|\d|"(.*?)")+|\w+|"(.*?)")';
            })
            
            var simplePhrase =  key.replace(/(\$.)/g, '');

            code = code.replace(new RegExp(phrasex, "g"), function (text) {
                var arg = text.replace(simplePhrase, '');
                
                variables.forEach(function(_var) {
                    text = args[key].replace(_var, arg);
                })
                
                return text;
            })
        })
        
        console.log(code);
    })
}

Compile();