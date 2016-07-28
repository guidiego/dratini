var fs = require('fs');
var Regexer = require('./regexer');

function clearSpaces(line) {
    return line !== ''
}

function recursiveCount(line, level) {
    var itemLevel = (level/4);
    var regex = new RegExp("^\\s{" + level + "}|^\\t{" + itemLevel + "}", "gi");

    if (!line.match(regex)) return itemLevel - 1 
    else return recursiveCount(line, level + 4)
}


function Compile() {
    fs.readFile('./src/sum.rb', {encoding: 'utf-8'}, function (err, file) {
        var code = file;
        var json = [];
        
        code = code.split("\n").filter(clearSpaces)
        
        code.forEach(function (line) {
            var itemLevel = recursiveCount(line, 0);
            
            var parent = json.filter(function (i) { return i.level == itemLevel - 1});
            parent = parent[parent.length - 1] || null;

            json.push({scope: line, parent: parent, level: itemLevel});
        });
        
        Regexer(json);
    })
}

Compile()