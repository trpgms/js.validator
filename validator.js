
// Validator
/* Usage
try {
    V(null).required('없나요?').result();
    V(123124124).required('없나요?').result();
    V('dap').required('없나요?').result();
    V('dap').required('없나요?').minlength(4,'짧네.').result();
} catch(e) {
    console.log(e);
}
*/
(function( global, factory ) {
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ? factory( global, true ) : function( w ) { return factory( w ); };
    } else {
        factory( global );
    }
}(window , function( window, noGlobal ) {
    var version = "0.0.1";
    var strundefined = typeof undefined;
    var Validator = function( value ) {
        return new Validator.fn.init( value );
    };
    Validator.fn = Validator.prototype = {
        validator: version,
        constructor: Validator,
        value: "",
        message:{},
        formula:{},
        required: function(_msg) {
            this.message['required'] = _msg;
            this.formula['required'] = true;
            return this;
        },
        minlength: function(_count, _msg) {
            this.message['minlength'] = _msg;
            this.formula['minlength'] = _count;
            return this;
        },
        maxlength: function(_count, _msg) {
            this.message['maxlength'] = _msg;
            this.formula['maxlength'] = _count;
            return this;
        },
        between: function(_start, _end, _msg) {
            this.message['between'] = _msg;
            this.formula['between'] = {start : _start , end : _end};
            return this;
        },
        length: function(_count, _msg) {
            this.message['length'] = _msg;
            this.formula['length'] = _count;
            return this;
        },
        number: function(_msg) {
            this.message['number'] = _msg;
            this.formula['number'] = true;
            return this;
        },
        result: function() {
            var arr = Object.keys(this.formula);

            for(var k in arr) {
                var key = arr[k];
                if(key == 'required') {
                    if(/([^\s])/.test(this.value) == false) {
                        throw this.message[key];
                    }
                } else if(key == 'length') {
                    if(this.value.length != this.formula[key]) {
                        throw this.message[key];
                    }
                } else if(key == 'minlength') {
                    if(this.formula[key] > this.value.length   ) {
                        throw this.message[key];
                    }
                } else if(key == 'maxlength') {
                    if( this.value.length > this.formula[key]) {
                        throw this.message[key];
                    }
                } else if(key == 'between') {
                    this.value *= 1;
                    if( this.value < this.formula[key].start ||  this.value > this.formula[key].end) {
                        throw this.message[key];
                    }
                } else if(key == 'number') {
                    if(/^\d+$/.test(this.value) == false) throw this.message[key];
                }
            }
            return true;
        }
    };
    var init = Validator.fn.init = function( value ) {
        if ( typeof value === "string" ) {
            this.value = value;
        } else if ( typeof value === "number" ) {
            this.value = ''+value;
        } else {
            this.value = '';
        }
        this.message = {};
        this.formula = {};
    };
    init.prototype = Validator.fn;
    if ( typeof noGlobal === strundefined ) {
        window.Validator = window.V = Validator;
    }
    return Validator;
}));
