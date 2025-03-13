import {View, Text, ImageBackground, Image} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {images} from "@/constants/images";

const TabIcon = (focuced, icon, title): any => {
    if(focuced){
    return (
        <ImageBackground
            source={images.highlight}
            className='flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden'
            style={{width: 25, height: 25}}>
            <Image source={icon}
                   tintColor='#151312'
                   style={{
                       width: 25,
                       height: 25
                   }}
                   className='size-5'
            />
            <Text
                className='text-secondary text-base font-semibold ml-2'
            >{title}</Text>
        </ImageBackground>
    )}
    else {
        return (
            <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon}
                   tintColor='#151312'
                   className='size-5'
            />
            </View>
        )
    }
}

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={
                {headerShown: false, title: 'Home', tabBarIcon: ({focused}) => {
                        return (
                            <>
                                <TabIcon focused={focused}
                                         icon={images.home}
                                         title='Home'/>
                            </>
                        )
                    }}
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
