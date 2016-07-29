module.exports = {
    interceptors: {
        end: function (last, next) {
            
        }
    },
    
    conversors: {
        "{{name}} = {{value}}": function (vars, obj) {
            return vars.name.indexOf("@") > -1 ? 
                            'this.' + vars.name.replace("@", "") + " = " + vars.value :
                            'var ' + vars.name + ' = ' + vars.value
        },
        "class {{name}}": "class {{name}} {",
        "def {{declaration}}": function (vars, obj) {
            if (obj.parent)
                if (obj.parent.scope.indexOf("class") == -1) return "function " + declaration + "{"
            
            if (vars.declaration.indexOf("initialize") > -1) vars.declaration = vars.declaration.replace("initialize", "constructor")
            return vars.declaration.replace("def ", "") + " {";
        },
        "end": "}"
    }
}
