import React, {Component} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Animated,
	Dimensions,
	PanResponder
} from 'react-native';

import _ from 'underscore';

const { windowWidth, windowHeight } = Dimensions.get('window');
const REGIONS = {
    threshold: 200,
    upBoundary: 0,
    bottomBoundary: 350,
    dragableTop: -20,
    dragableBottom: 370
}

export default class DragScroller extends Component {

    constructor (props) {
        /*
         * 5 important line in props object regionBoundarys (required):
         * threshold: center threshold to seperate different models.
         * upBoundary
         * bottomBoundary
         * dragableTop
         * dragableBottom
         * 
         * 3 callback function:
         * onDragBegin
         * onDragMove
         * onDragEnd
         */

        super(props);

        // Components refers.
        this.scrollerContainer = null;
		this.dragableBar = null;

		this.state = {
			scrollerOffset: new Animated.Value(0)
		};

        // Dynamic value for height offset
		this.previousHeightOffset = 0;
        this.newHeightOffset = 0;
        
        // Region boundarys.
        this.adapter(REGIONS, this.props.regionBoundarys);
    }

    componentWillMount() {
        // Register panResponder.
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
        
            onPanResponderGrant: this.onPanResponderGrant.bind(this),
            onPanResponderMove: _.throttle( this.onPanResponderMove.bind(this), 16 ),
            onPanResponderRelease: this.onPanResponderEnd.bind(this),
            onPanResponderTerminate: this.onPanResponderEnd.bind(this)
        });
    }

    render() {

        let { scrollerOffset } = this.state;

        return (
            <Animated.View 
                style={[
                    styles.scrollerContainer, 
                    {transform: [{translateX: 0}, {translateY: scrollerOffset}]}
                ]}
                ref={ ref => {this.scrollerContainer = ref} }
            >
                {/* Dragable Bar */}
                <View
                    {...this._panResponder.panHandlers}
                    style={[styles.dragableBar]}
                    ref={ ref => {this.dragableBar = ref} }
                >
                    <Text style={styles.dragableBarText}></Text>
                </View>

            </Animated.View>
        );
    }

    adapter(defaultObj, obj) {
        for(let v in defaultObj) {
            obj[v] = obj[v] || defaultObj[v]
        }
        return obj;
    }

    updateScollerStyle(heightOffset) {
        let newStyle = {
            style: {
                transform: [{translateX: 0}, {translateY: heightOffset}]
            }
        }
        this.scrollerContainer && this.scrollerContainer.setNativeProps( newStyle )
    }

    onPanResponderGrant(e, gestureState) {

        // callBack for begin drag
        this.props.onDragBegin && this.props.onDragBegin();
    }
    
    onPanResponderMove(e, gestureState) {
        let newOffSet = gestureState.dy + this.previousHeightOffset;
        console.log(gestureState.dy, this.previousHeightOffset)

        // Threshold for top & bottom.
        if (newOffSet >= this.props.regionBoundarys.dragableTop && newOffSet <= this.props.regionBoundarys.dragableBottom) {
            this.updateScollerStyle( newOffSet );
            this.newHeightOffset = newOffSet;
        }

        // Cause scroll event happens hunderds time per second. And throttle to it.
        if (this.props.onDragMove) {
            let throttledDragMove = _.throttle(this.props.onDragMove, 250);
            throttledDragMove();
        }
    }

    onPanResponderEnd(e, gestureState) {
        if (this.newHeightOffset < this.props.regionBoundarys.threshold) {
            this.stickyToTop();
        } else if (this.newHeightOffset >= this.props.regionBoundarys.threshold) {
            this.stickyToBottom();
        }
        
        // Update height offset.
        this.previousHeightOffset = this.newHeightOffset;

        this.props.onDragEnd && this.props.onDragEnd();
    }

    animateToPosition(isToBottom) {

        let targetOffset = isToBottom ? this.props.regionBoundarys.bottomBoundary : 0;

        // Reset to new position.
        Animated.timing(
            this.state.scrollerOffset,
            {
                toValue: this.newHeightOffset,
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
        this.newHeightOffset = targetOffset;
    }


    stickyToTop() {

        this.animateToPosition(false);

        // callBack for long mode
        this.props.stickyToTopCallBack && this.props.stickyToTopCallBack();
    }

    stickyToBottom() {
        
        this.animateToPosition(true);
        
        // callBack for long mode
        this.props.stickyToBottomCallBack && this.props.stickyToBottomCallBack();
    }

}

const styles = StyleSheet.create({
	scrollerContainer: {
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: 500,
		bottom: 0,
		alignItems: 'center',
		zIndex: 200,
		backgroundColor: 'white',
		overflow: 'hidden'
	},
	dragableBar: {
		width: Dimensions.get('window').width,
		height: 50,
		justifyContent: 'center',
        backgroundColor: 'grey',
	}
});