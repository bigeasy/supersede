function Supersede () {
    this._root = {}
    this._root[''] = this._root
}

Supersede.prototype.set = function (path, value) {
    var node = this._root

    for (var i = 0, I = path.length; i < I; i++) {
        if (!node[path[i]]) {
            node[path[i]] = {}
        }
        node = node[path[i]]
    }

    node['.value'] = value

    return value
}

Supersede.prototype.remove = function (path) {
    var stop = path.length - 1
    var unset = path[stop]
    var ignore

    var value = this._value, parent = this._root, node, i = 0
    while (i < stop && (node = parent[path[i]])) {
        i++
        parent = node
    }

    if (i == stop) {
        if (unset == '*') {
            ignore = node === this._root ? [ '.value', '' ] : [ '.value' ]
            for (var key in parent) {
                if (ignore.indexOf(key) == -1) {
                    delete parent[key]
                }
            }
        } else if (node === this._root) {
            delete parent['.value']
        } else {
            delete parent[unset]
        }
    }
}

Supersede.prototype.get = function (path) {
    var node = this._root, i = 0, value
    do {
        value = node['.value'] == null ? value : node['.value']
        node = node[path[i++]]
    } while (node)
    return value
}

Supersede.prototype.gather = function (path) {
    var node = this._root, i = 0, array = []
    for (;;) {
        node = node[path[i++]]
        if (node == null) {
            break
        }
        if (node['.value'] != null) {
            array.push(node['.value'])
        }
    }
    return array
}

module.exports = Supersede
