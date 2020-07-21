// ES6Module规范（引入必须在最开始）
import {
    bind
} from './nav'

// import jquery from 'jquery'

console.log($);
// CommonJS规范(node)
let {
    test
} = require('./common')
bind()
test()

// css 需要倒入
require('./index.less')

@log
class A {
    constructor() {
        n = 10
    }

    static say() {
        console.log('AAAA');
    }
}

function log(target) {
    target.m = 10
}

A.n
console.log(A.m);
A.say()