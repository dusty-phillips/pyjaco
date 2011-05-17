/* Python 'dict' type */

var dict = __inherit(object);

dict.prototype.MARK = "dict";

dict.prototype.__init__ = function(args) {
    var items;
    var key;
    var value;

    if (defined(args)) {
        if (defined(args.__iter__)) {
            items = {};
            iterate(iter.__call__(args), function(item) {
                    key = js(item.__getitem__(0));
                    value = item.__getitem__(1);
                    items[key] = value;
            });
            this._items = items;
        }
        else
            this._items = args;
    } else {
        this._items = {};
    }
};

dict.__name__ = 'dict';
dict.prototype.__class__ = dict;

dict.prototype.__str__ = function () {
    var strings = [];

    for (var key in this._items) {
        strings.push(js(str.__call__(key)) + ": " + js(str.__call__(this._items[key])));
    }

    return str.__call__("{" + strings.join(", ") + "}");
};

dict.prototype.toString = function () {
    return js(this.__str__());
};

dict.prototype._js_ = function () {
    var items = {};

    var _this_dict = this; // so that we can access it from within the closure:
    iterate(iter.__call__(this), function(key) {
        items[key] = js(_this_dict.__getitem__(key));
    });

    return items;
};

dict.prototype.__hash__ = function () {
    throw new py_builtins.TypeError("unhashable type: 'dict'");
};

dict.prototype.__len__ = function() {
    var count = 0;

    for (var key in this._items) {
        count += 1;
    }

    return count;
};

dict.prototype.__iter__ = function() {
    return iter.__call__(this.keys());
};

dict.prototype.__contains__ = function(key) {
    return defined(this._items[key]);
};

dict.prototype.__getitem__ = function(key) {
    var value = this._items[key];

    if (defined(value)) {
        return value;
    } else {
        throw new py_builtins.KeyError(str.__call__(key));
    }
};

dict.prototype.__setitem__ = function(key, value) {
    this._items[key] = value;
};

dict.prototype.__delitem__ = function(key) {
    if (this.__contains__(key)) {
        delete this._items[key];
    } else {
        throw new py_builtins.KeyError(str.__call__(key));
    }
};

dict.prototype.get = function(key, value) {
    var _value = this._items[key];

    if (defined(_value)) {
        return _value;
    } else {
        if (defined(value)) {
            return value;
        } else {
            return null;
        }
    }
};

dict.prototype.items = function() {
    var items = [];

    for (var key in this._items) {
        items.push([key, this._items[key]]);
    }

    return items;
};

dict.prototype.keys = function() {
    var keys = list.__call__();

    for (var key in this._items) {
        keys.append(key);
    }

    return keys;
};

dict.prototype.values = function() {
    var values = [];

    for (var key in this._items) {
        values.push(this._items[key]);
    }

    return values;
};

dict.prototype.update = function(other) {
    for (var key in other) {
        this._items[key] = other[key];
    }
};

dict.prototype.clear = function() {
    for (var key in this._items) {
        delete this._items[key];
    }
};

dict.prototype.pop = function(key, value) {
    var _value = this._items[key];

    if (defined(_value)) {
        delete this._items[key];
    } else {
        if (defined(value)) {
            _value = value;
        } else {
            throw new py_builtins.KeyError(str.__call__(key));
        }
    }

    return _value;
};

dict.prototype.popitem = function() {
    var _key;

    for (var key in this._items) {
        _key = key;
        break;
    }

    if (defined(key)) {
        return [_key, this._items[_key]];
    } else {
        throw new py_builtins.KeyError("popitem(): dictionary is empty");
    }
};

