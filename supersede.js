function Supersede (value) {
    this._root = {}
    this._value = value
}

Supersede.prototype._split = function (path) {
    return path == '.' ? [ ''  ] : path.split('.')
}

Supersede.prototype.set = function (path, value) {
    var parts = this._split(path)

    var node = this._root, child

    for (var i = 0, I = parts.length; i < I; i++) {
        if (!node[parts[i]]) {
            node[parts[i]] = {}
        }
        node = node[parts[i]]
    }

    node['.value'] = value

    return value
}

Supersede.prototype.remove = function (path) {
    var parts = this._split(path)
    var unset = parts.pop()

    var value = this._value, parent = this._root, node, i = 0
    while (i < parts.length && (node = parent[parts[i]])) {
        i++
        parent = node
    }

    if (i == parts.length) {
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
    var parts = this._split(path)
    var parts = path.split('.')

    var value = this._value, node = this._root, child, i = 0
    while (child = node[parts[i++]]) {
        node = child
        value = node['.value'] == null ? value : node['.value']
    }

    return value
}

module.exports = Supersede
