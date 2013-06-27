// Implementing map and reduce

;(function(exports) {
    
    Array.prototype.map = function (f) {
        if (this.length > 0) {
            return [f(this[0])].concat(this.slice(1, this.length + 1).map(f));
        }
        else {
            return [];
        }
    };

    // Style more similar to other functional languages -- works, but doesn't
    // capitalize on how Javascript handles scope/receiver contex
    Array.prototype.bad_reduce = function (f, acc) {
        var helper = function (arr, f, acc) {
            if (arr.length > 0) {
                if (acc === undefined) { 
                    return helper(arr.slice(1, arr.length + 1), f, arr[0]);
                }
                else {
                    return helper(arr.slice(1, arr.length + 1), f, f(acc, arr[0]));
                }
            }
            else {
                return acc;
            }
        };
        return helper(this, f, acc);
    };

    // After getting a better understanding of how 'this' works and the mechanics
    // behind 'call'...
    Array.prototype.reduce = function (f, acc) {
        if (this.length > 0) {
            if (acc === undefined) {
                return this.reduce.call(this.slice(1, this.length + 1), f, this[0]);
            }
            else {
                return this.reduce.call(this.slice(1, this.length + 1), f, f(acc, this[0]));
            }
        }
        else {
            return acc;
        }
    };

})(this);
