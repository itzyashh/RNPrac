import React, { useState } from 'react'
import { FlatList, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const users = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "David Miller" },
  { id: 5, name: "Eve Adams" },
]

export default function SearchExample() {
  const [search, setSearch] = useState("")

  const filteredUsers = () => {
    return users.filter(user=> user.name.toLowerCase().includes(search.toLowerCase()))
  }

  const f = filteredUsers()

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TextInput
        placeholder="Search name"
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10 }}
      />

      <FlatList
        data={f}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  )
}
