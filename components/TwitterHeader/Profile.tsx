import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const WrappedProfileScreen = () => {
    return (
        <SafeAreaProvider>
            <Profile />
        </SafeAreaProvider>
    )
}

const Profile = () => {
  return (
    <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
      <Text>Profile</Text>
    </View>
  )
}

export default WrappedProfileScreen

const styles = StyleSheet.create({
        container: {
        backgroundColor: '#0d0d0d',
        flex: 1,
    }
})