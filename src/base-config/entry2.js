const { num1, num2 } = require('@/base-config/files-lib/lib')
const sum = require('@/base-config/files-lib/sum')
// import n1 from './normal1';
// import n2 from './normal2';
require('@/base-config/files-lib/normal3') // 一个独立的module，若无共同引或其它规则，不会被webpack当作一个chunk，而是作为引用其的chunk的依赖，进行相关打包

window.objj2 = sum(num1, num2)