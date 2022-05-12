import { join } from 'lodash-es';

function component() {
    const element = document.createElement('div');

    // -lodash（目前通过一个 script 引入）对于执行这一行是必需的
    // +lodash 在当前 script 中使用 import 引入
    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());