import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Link, RelativePathString } from 'expo-router'

type Screen = {
  id: string,
  name: string,
  route: RelativePathString
}

const Screens: Screen[] = [
  {id:'1',name:'Search',route:"scenarios/search" as RelativePathString},
  {id:'2',name:'Cart',route:"scenarios/cart" as RelativePathString},
  {id:'3',name:'Twitter Header',route:"scenarios/twitterHeader" as RelativePathString},
  {id:'4',name:'Square Animation',route:"scenarios/Reanimated/SquareAnimation" as RelativePathString},
  {id:'5',name:'Pan Gesture Animation',route:"scenarios/Reanimated/PanGestureAnimation" as RelativePathString},
  {id:'6',name:'Scrolling Header',route:"scenarios/Reanimated/ScrollingHeader" as RelativePathString}
]

const index = () => {


  return (
    <View>
      <FlatList
      data={Screens}
      renderItem={({item})=><Link href={item.route} >
        <Text>{item.id} {item.name}</Text>
        </Link>
        }
      />
    </View>
  )
}

export default index