/**
 * Sample Ctrip React Native App
 * http://crn.site.ctripcorp.com/
 * @flow
 */

'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
	Dimensions,
	PanResponder
} from 'react-native';

import {
	Page,
	Button,
	ViewPort,
	ScrollView,
	MapView
} from '@ctrip/crn';

import ErrorBox from './component/ErrorBox.js'

const {windowWidth, windowHeight} = Dimensions.get('window');

export default class ErrorBoxDemo extends Page {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ViewPort>
                <ErrorBox
                    type={'no_result'}
                    titile={'no result for your search'}
                    btn={{
                        text: 'Tap Me!',
                        callback: () => {alert('But nothing happens.')}
                    }}
                />
			</ViewPort>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
});