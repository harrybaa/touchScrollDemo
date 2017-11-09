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

const {windowWidth, windowHeight} = Dimensions.get('window');

class AAbb extends Component {
	render () {
        return (
			<View>
            <MapView.ImageOverlay 
			transparency={0.3} 
			imageRegion={{
				latitude: 39.9385466,
				longitude: 116.1172793,latitudeDelta: 90,longitudeDelta: 60}} 
				image={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Dolphind.jpg/200px-Dolphind.jpg'}
				/>
			</View>
        )
    }
}

class Marks extends Component {
	render () {
		return (
			<MapView.Marker
				coordinate={{
					latitude: 39.9385466,
					longitude: 116.1172793
				}}
			/>
		)
	}
}

export default class Page1 extends Page {

	constructor(props) {
		super(props);
		this.scrollContainer = null; // Scroll View container
		this.touchableBar = null; // Scroll View controler bar

		this.state = {
			scrollerOffset: new Animated.Value(0),
			isHideOverlay: false
		};

		this._previousHeightOffset = 350;
		this._newHeightOffset = 0;
	}

	componentWillMount() {

		// Register panResponder.
		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
		
			onPanResponderGrant: this._onPanResponderGrant,
			onPanResponderMove: this._onPanResponderMove.bind(this),
			onPanResponderRelease: this._onPanResponderEnd.bind(this),
			onPanResponderTerminate: this._onPanResponderEnd.bind(this)
		});
	}

	componentDidMount() {
		
		// Initial position.
		this._updateScollerStyle( this._previousHeightOffset );
	}

	render() {

		let { scrollerOffset, isHideOverlay } = this.state;

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
						{ isHideOverlay ? null :
							<Marks/>
						}

						{ isHideOverlay ? null :
							<MapView.ImageOverlay
								imageRegion={{
									latitude: 39.9385466,
									longitude: 116.1172793,
									latitudeDelta: 90,
									longitudeDelta: 60
								}}
								transparency={0.5}
								image={'http://file.veryzhun.com/buckets/weather/keys/82d549d7c6788d161be11ce351497f4c.png'}
							/>
						}

					</MapView>

				</View>

				<Animated.View 
					style={[styles.scrollContainer, {transform: [{translateX: 0}, {translateY: scrollerOffset}]}]}
					/* style={styles.scrollContainer} */
					ref={ ref => {this.scrollContainer = ref} }
				>
					<View
						{...this._panResponder.panHandlers}
						style={[styles.touchableBar]}
						ref={ ref => {this.touchableBar = ref} }
					>
						<Text onPress={this.changeOverlay.bind(this)}>ooooooooooooTouch Me! Drag Me!oooooooooooo</Text>
					</View>

					<ScrollView style={[styles.scrollViewWrapper]}>
						{
							new Array(10).fill('').map((item, index) =>
								<View
									key={index}
									style={[
										styles.scrollItem,
										{backgroundColor: this.getRandomColor()}
									]}
								>
									<Text style={{ color: '#000', fontSize: 15, padding: 10 }}>{index}</Text>
								</View>
							)
						}
					</ScrollView>

				</Animated.View>
			</ViewPort>
		);
	}

	_updateScollerStyle(heightOffset) {
		let newStyle = {
			style: {
				transform: [{translateX: 0}, {translateY: heightOffset}]
			}
		}
		this.scrollContainer && this.scrollContainer.setNativeProps( newStyle )
	}

	_onPanResponderGrant(e, gestureState) {}
	
	_onPanResponderMove(e, gestureState) {
		let newOffSet = gestureState.dy + this._previousHeightOffset;

		// Threshold for head & bottom.
		if (newOffSet >= -20 && newOffSet <= 370) {
			this._updateScollerStyle( newOffSet );
			this._newHeightOffset = newOffSet;
		}
	}

	_onPanResponderEnd(e, gestureState) {
		
		if (this._newHeightOffset < 200) {
			this.changeToListMode();
			
		} else if (this._newHeightOffset >= 200) {
			this.changeToCarouselMode();
		} 
		
		// Update height offset.
		this._previousHeightOffset = this._newHeightOffset;
	}

	_animateToPosition(position) {

		let targetOffset = position === "bottom" ? 350 : 0;

		// Reset to new position.
		Animated.timing(
			this.state.scrollerOffset,
			{
			  toValue: this._newHeightOffset,
			  duration: 0
			}
		).start(); 

		// Animate it!
		Animated.timing(
			this.state.scrollerOffset,
			{
			  toValue: targetOffset,
			  duration: 300
			}
		).start(); 

		// Update the new offset.
		this._newHeightOffset = targetOffset;
	}

	changeOverlay() {
		this.setState({
			isHideOverlay: !this.state.isHideOverlay
		})
	}
 
	getRandomColor() {
		let letters = '0123456789abcdef',
			color = '#';

		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		
		return color;
	}

	changeToListMode() {

		this._animateToPosition("top");

		// ... work code here ...
	}

	changeToCarouselMode() {
		
		this._animateToPosition("bottom");
		
		// ... work code here ...
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