module.exports = {
    interceptors: {
        end: function (last, next) {
            
        }
    },
    
    conversors: {
        "{{name}} = {{value}}": function (vars, obj) {
            return vars.name.indexOf("@") > -1 ? 
                            'this.' + vars.name.replace("@", "") :
                            'var ' + vars.name + ' = ' + vars.value
        },
        "class {{name}}": "class {{name}} {",
        "def {{declaration}}": function (declaration, obj) {
            if (obj.parent)
                if (obj.parent.scope.indexOf("class") == -1) return "function " + declaration + "{"
            
            console.log(declaration);
            if (declaration.indexOf("initialize") > -1) declaration = declaration.replace("initialize", "constructor")
            return declaration.replace("def ", "") + " {";
        },
        "end": "}",
        "{{name}}.new{{declaration}}": function (dec, obj) {
            console.log(dec);
        }
    }
}
