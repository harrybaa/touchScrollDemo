import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Dimensions
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 9,
        backgroundColor: '#F5F5F5',
        alignItems: 'center'
    },
    noResult: {
        width: 162,
        height: 266,
        marginTop: 81
    },
    noNetwork: {
        width: 130,
        height: 130,
        marginTop: 208
    },
    desc: {
        marginTop: 15,
        fontSize: 14,
        color: '#666666'
    },
    btn: {
        width: Dimensions.get('window').width / 2,
        height: 46,
        marginTop: 10,
        lineHeight: 46,
        color: 'white',
        backgroundColor: '#1359B8',
        borderRadius: 6,
    }
})

export default class ErrorBox extends Component {

    constructor(props) {
        super(props);
        this.type = this.props.type || 'no_result';
        this.title = this.props.title || 'Some Error...';
    }

    render() {
        let imgStyle = this.type === 'no_result' ? 'noResult' : 'noNetwork';

        return (
            <View style={ styles.container }>
                <Image
                    style={ styles[imgStyle] }
                    source={{
                        uri: `https://pic.c-ctrip.com/AssetCatalog/react-native/travel/${this.type}.png`
                    }}
                />
                <Text style={ styles.desc }>
                    { this.title }
                </Text>

                {
                    this.props.btn ?
                    <Button
                        onPress={ this.props.btn.callback }
                        style={ styles.btn }
                        title={ this.props.btn.title || 'button' }
                    >
                        { this.props.btn.text }
                    </Button>
                    : null
                }
            </View>
        )
    }
}