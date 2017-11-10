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

import _ from 'underscore';

import DragableScroller from './component/DragableScroller.js'

const {windowWidth, windowHeight} = Dimensions.get('window');

export default class Page1 extends Page {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<ViewPort>

				<View style={styles.mapContainer}>
					<MapView 
						style={styles.map}
						initialRegion={{
							latitude: 39.9385466,
							longitude: 116.1172793,
							latitudeDelta: 90,
							longitudeDelta: 60,
						}}
					>

					</MapView>
				</View>

				<DragableScroller
					regionBoundarys={{
						threshold: 200,
						upBoundary: 0,
						bottomBoundary: 350,
						dragableTop: -20,
						dragableBottom: 370
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
	},
	mapContainer: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	map: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	scrollContainer: {
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: 500,
		bottom: 0,
		alignItems: 'center',
		zIndex: 200,
		backgroundColor: 'white',
		transform: [{translateY: 350}],
		overflow: 'hidden'
	},
	touchableBar: {
		width: Dimensions.get('window').width,
		height: 50,
		justifyContent: 'center',
		backgroundColor: 'lime'
	},
	scrollViewWrapper: {
		width: Dimensions.get('window').width,
	},
	scrollItem: {
		width: Dimensions.get('window').width,
		height: 100,
	},
	sampleImage: {
		width: Dimensions.get('window').width-50,
		margin: 25,
		height: 80,
	}
});