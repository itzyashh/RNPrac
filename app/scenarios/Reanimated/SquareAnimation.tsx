import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


const squareSize = 120; // Size of the square

const SquareAnimation = () => {

    const scale = useSharedValue(1)// this value is shared with the ui and js thread
    const rotate = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, {rotate: `${rotate.value}deg`}]
        }
    })

  return (
    <View style={styles.container}>
      <Animated.View
      onTouchStart={()=> {
          scale.value = withTiming(1.2)
      }}
      onTouchEnd={()=> {
          scale.value = withTiming(1)
          rotate.value = withRepeat(withTiming(rotate.value + 90), 2,false)

      }}
      style={[styles.square, rStyle]} />
    </View>
  )
}

export default SquareAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    square: {
        width: squareSize,
        height: squareSize,
        backgroundColor: '#00aeff',
        borderRadius: 16,
        borderCurve: 'continuous'
    },
})