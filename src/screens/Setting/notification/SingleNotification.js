import React from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';

const SingleCardAnimation = () => {
    const itemTranslate = new Animated.Value(100); // Initialize the animated value

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            // Limit swipe to the left
            const dx = Math.min(0, gestureState.dx); // Only allow negative values (swipe left)
            Animated.event([null, { dx: itemTranslate }], { useNativeDriver: false })(event, { dx }); // Update the animated value
        },        onPanResponderRelease: (e, gestureState) => {
            // Implement your logic for releasing the pan responder
        }
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers}>
                <Text style={styles.txt}>Swipe Left or Right</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        //marginBottom: 3,
        borderRadius:20
    },
    item: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius:20
    },
    txt: {
        color: '#777',
        letterSpacing: 1
    },
});

export default SingleCardAnimation;
