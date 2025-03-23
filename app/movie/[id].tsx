import {View, Text, SafeAreaView,Image, Animated} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import ScrollView = Animated.ScrollView;

const MovieDetails = () => {
    const { title, backdrop_path, release_date, vote_average, overview } = useLocalSearchParams();
    return (
        <ScrollView className="flex-1 bg-black p-4 pt-16">
            {backdrop_path ? (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
                    className="w-full h-80 rounded-lg"
                />
            ) : (
                <View className="w-full h-60 rounded-lg bg-gray-800 justify-center items-center">
                    <Text className="text-white">No Image</Text>
                </View>
            )}
            <View className='flex flex-row mt-4 gap-2 w-full items-center justify-center'>
                <Text className="text-white font-bold mt-4 text-4xl">{title}</Text>
            </View>
           <View className='flex flex-row mt-4 gap-2 w-full items-center justify-between'>
               <Text className="text-gray-400 text-sm">📅 {release_date}</Text>
               <Text className="text-yellow-400 text-lg font-bold mt-2">⭐ {parseFloat(vote_average as string).toFixed(1)}</Text>
           </View>

            <Text className="text-gray-400 text-sm mt-2">{overview}</Text>
        </ScrollView>
    )
}
    export default MovieDetails
