import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={
                {
                    headerShown: false,
                    title: 'Home'
                }
                }
            />
            <Tabs.Screen name="saved"
                         options={
                             {
                                 headerShown: false,
                                 title: 'Saved'
                             }
                         }/>
            <Tabs.Screen name="search" options={{
                headerShown: false,
                title: 'Search'
            }}/>
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                title: 'Profile'
            }}/>
            <Tabs.Screen name="movie/[id]" options={{
                headerShown: false,
                title: 'MovieDetails'
            }}/>
        </Tabs>
    )
}
export default _Layout
