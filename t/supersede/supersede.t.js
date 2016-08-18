require('proof/redux')(11, prove)

function prove (assert) {
    var Supersede = require('../../supersede')
    var set = new Supersede

    assert(set.get('.hello'.split('.')) == null, 'empty get')
    set.set([ '', '' ], 'a')
    assert(set.get([ '' ]), 'a', 'root alias')
    assert(set.get('.hello'.split('.')), 'a', 'super get')
    set.set('.hello.world'.split('.'), 'x')
    set.set('.hello.nurse'.split('.'), 'y')
    set.remove('.hello'.split('.'))
    assert(set.get('.hello'.split('.')), 'a', 'short path get')
    assert(set.get('.hello.nurse'.split('.')), 'y', 'full path get')
    assert(set.gather('.hello.nurse'.split('.')), [ 'a', 'y' ], 'gather')
    set.set('.hello'.split('.'), 'c')
    assert(set.get('.hello'.split('.')), 'c', 'parent get')
    set.remove('.hello.nurse'.split('.'))
    assert(set.get('.hello.world'.split('.')), 'x', 'child get')
    assert(set.get('.hello.nurse'.split('.')), 'c', 'child get parent value')
    set.set('.hello.nurse'.split('.'), 'y')
    assert(set.get('.hello.nurse'.split('.')), 'y', 'child reset get')
    set.remove('.hello.earth'.split('.'))
    set.remove('.'.split('.'))
    assert(set.get('.'.split('.')) == null, 'remove root')
    return
    assert(set.get('.hello.world'.split('.')), 'c', 'delete all one')
    assert(set.get('.hello.nurse'.split('.')), 'c', 'delete all two')
    set.remove('.*'.split('.'))
    assert(set.get('.hello.nurse'.split('.')), 'a', 'delete root children')
    set.remove('.'.split('.'))
    assert(Object.keys(set._root), [ '' ], 'delete root value')
    set.remove('.hello.nurse'.split('.'))
}
