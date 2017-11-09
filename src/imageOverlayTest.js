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
	Dimensions
} from 'react-native';

import {
	Page,
	ViewPort,
	Button,
	MapView
} from '@ctrip/crn';

export default class Page2 extends Page {

	constructor(props) {
		super(props)

		this.state = {
			isShow: true
		}
	} 

	render() {
		let { isShow } = this.state;

		return (
			<ViewPort>
			<View style={styles.container}>
				
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
						{ isShow ?
							<MapView.Marker
								coordinate={{
									latitude: 39.9385466,
									longitude: 116.1172793
								}}
							/>
							: null
						}

						{ isShow ?
							<MapView.ImageOverlay
								imageRegion={{
									latitude: 39.9385466,
									longitude: 116.1172793,
									latitudeDelta: 30,
									longitudeDelta: 60
								}}
								transparency={0.3}
								image={'https://dn-sdkcnssl.qbox.me/article/RLtHXllNI-5an7Lidhz9.png'}
							/>
							: null
						}

					</MapView>

				</View>
				
				<Button
					onPress = { this.toggleShow.bind(this) }
					style={styles.button}>
					toggle
				</Button>
			</View>
			</ViewPort>
		);
	}

	toggleShow() {
		this.setState({
			isShow: !this.state.isShow
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
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
	button: {
		width: Dimensions.get('window').width,
		height: 25,
		position: 'absolute',
		backgroundColor: 'black',
		bottom: 20
	}
});