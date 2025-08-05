import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SQUARE_SIZE = 135;

const PanGestureAnimation = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotate = useSharedValue(0);

    // get context of the gesture
    const context = useSharedValue({ x: 0, y: 0 });

    const panGesture = Gesture.Pan()
    .onBegin(e => {
        context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(e=>{
        console.log('Gesture updated', e);
        translateX.value = e.translationX + context.value.x;
        translateY.value = e.translationY + context.value.y;
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate.value}deg` },
            ]
        }
    })

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerTitle: 'Pan Gesture Animation', headerShown: false }} />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            onTouchStart={() => rotate.value = withSpring(rotate.value + 45)}
            onTouchEnd={() => rotate.value = withSpring(rotate.value - 45)}
          style={[styles.square, rStyle]} />
        </GestureDetector>
        <View style={styles.background} />
    </View>
  )
}

export default PanGestureAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: '#5792ff',
        borderRadius: 20,
        borderCurve: 'circular'
    },
    background: {
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#000',
        justifyContent: 'center',
        zIndex: -1,
    }
})