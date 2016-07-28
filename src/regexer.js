var args = require('./config');

function Regexer(json) {
    var code = "";
    json.forEach(function(lineObj, index) {
        var line = lineObj.scope;
        
        Object.keys(args.conversors).forEach(function (key) {
            var variables = [];
            
            if (key.indexOf("$") == -1) {
                line = line.replace(new RegExp(key, "g"), args[key]);
                return;   
            }
            
            var phrasex = key.replace(/(\$+.*)/g, function (x) {
                variables.push(x);
                
                
                if (x.replace("$", "").indexOf("$") > -1) return '((\\w+|\\d+) |(\\w+|\\d+))(=|==|===|!=|!==|>|<|<=|>=|>>|><|<<|<>)( (\\w+|\\d+)|(\\w+|\\d+))'
                return '((\\w|\\d|"(.*?)")+(\\s)?,(\\s)?|)+(\\w|\\d|"(.*?)"|\\(.*\\))+';
            })
            
            
            var simplePhrase = key.replace(/(\$.*)/g, '');
            
            line = line.replace(new RegExp(phrasex, "g"), function (text) {
                var arg = text.replace(simplePhrase, '');
                var template = args.conversors[key];
     
                if (typeof template == 'string') {
                    variables.forEach(function (v){ template = template.replace(v, arg) })
                    return template;
                } else {
                    return template(arg, lineObj, json[index + 1]);
                }
            })
        })      
    
        code += "\n" + line;
    })
    
    console.log(code);
}


module.exports = Regexer;