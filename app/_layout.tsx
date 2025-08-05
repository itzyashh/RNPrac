import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="scenarios/twitterHeader"
        options={{
          headerShown: false,
        }} />
    </Stack>
  )
}

export default gestureHandlerRootHOC(RootLayout)