/**
 * Sample Ctrip React Native App
 * http://crn.site.ctripcorp.com/
 * @flow
 *
 * 此处有几点需要注意:
 * 1、必须将AppRegistry.registerComponent写在该文件中, 并且将AppComponent从其他处require进来;
 * 2、必须添加一个module.exports这一句, 发生产包必须这么做;
 */

'use strict';

import {
    AppRegistry
} from 'react-native';

const theCompnent = require('./main');

AppRegistry.registerComponent('touchScroll', () => theCompnent);

//Attention: 此处module.exports必须保留
module.exports = theCompnent;
