import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WrappedProfileScreen from '@/components/TwitterHeader/Profile'
const Profile = WrappedProfileScreen

const TwitterHeader = () => {
  return (
    <View style={{
        flex: 1
    }}
        >
      <Profile />
    </View>
  )
}

export default TwitterHeader

const styles = StyleSheet.create({

})