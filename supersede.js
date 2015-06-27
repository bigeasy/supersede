function Supersede (value) {
    this._root = { '.value': value }
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

    var value = this._value, parent = this._root, node, i = 0
    while (i < stop && (node = parent[path[i]])) {
        i++
        parent = node
    }

    if (i == stop) {
        if (unset == '*') {
            for (var key in parent) {
                if (key != '.value') {
                    delete parent[key]
                }
            }
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

module.exports = Supersede
