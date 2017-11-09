/**
 * Sample Ctrip React Native App
 * http://crn.site.ctripcorp.com/
 * @flow
 */

'use strict';

import {
    AppRegistry
} from 'react-native';

const theCompnent = require('./main');
AppRegistry.registerComponent('touchScroll', () => theCompnent);

//Attention: 此处module.exports必须保留
module.exports = theCompnent;