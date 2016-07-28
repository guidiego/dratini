module.exports = {
    interceptors: {
        end: function (last, next) {
            
        }
    },
    
    conversors: {
        "class $name": "class $name {",
        "def $declaration": function (declaration, obj) {
            if (obj.parent.scope.indexOf("class") == -1) return "function " + declaration + "{"
            if (declaration.indexOf("initialize") > -1) declaration = declaration.replace("initialize", "constructor")
            
            return declaration.replace("def ", "") + " {";
        },
        "@$name = $val": "this.$name = $val",
        "@$name": "this.$name",
        "end": "}"
    }
}
