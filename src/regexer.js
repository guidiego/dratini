var args = require('../formulas/ruby.formula');
var diff = require('diff').diffWords;

function Regexer(json) {
    var code = "";
    json.forEach(function(lineObj, index) {
        var line = lineObj.scope;
        
        Object.keys(args.conversors).forEach(function (key) {
            var variables = [];
            var diffs = diff(key, line.trim());
            var lastRemove = null;
            var realDiff = {};
            var template = args.conversors[key];
            
            if (key.indexOf("{{") == -1 && key.indexOf("}}") == -1) {
                line = line.replace(new RegExp(key, "g"), args.conversors[key]);
                return;   
            }
            
            diffs.filter(function (d) {
                if (d.removed) {
                    lastRemove = d.value.replace(/\{|\}/g, "");
                } else if (lastRemove) {
                    realDiff[lastRemove] = d.value;
                    lastRemove = null;
                }    
            })
            
            var phrasex = key.replace(/\{\{(.*?)\}\}/g, function (v) {
                if (v.indexOf("~") > -1) return '((\\w+|\\d+) |(\\w+|\\d+))(=|==|===|!=|!==|>|<|<=|>=|>>|><|<<|<>)( (\\w+|\\d+)|(\\w+|\\d+))';
                return '((\\w|\\d|"(.*?)")+(\\s)?,(\\s)?|)+(\\w|\\d|"(.*?)"|\\(.*\\))+';
            });

            if (!line.match(phrasex)) return;

            if (typeof template == 'string') {
                Object.keys(realDiff).forEach(function (key) {
                    var regex = new RegExp('\\{\\{' + key + '\\}\\}', "g");
                    template = template.replace(regex, realDiff[key])
                })
            
                line = template;  
            } else {
                line = template(realDiff, lineObj, {prev: json[index - 1], next: json[index + 1]})
            }
        })      
    
        code += "\n" + line;
    })
    
    console.log(code);
}


module.exports = Regexer;
