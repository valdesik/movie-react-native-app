import {View, Image, TextInput} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";

interface SearchBarProps {
    onPress?: () => void,
    placeholder?: string
}

const SearchBar = ({onPress, placeholder}: SearchBarProps) => {
    return (
        <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="w-5 h-5" resizeMode='contain' tintColor='#AB8bff'/>
            <TextInput placeholder={placeholder}
                       placeholderTextColor="#AB8bff"
                       className="flex-1 text-white text-base ml-2"
                       value=''
                       onChangeText={() => {
                       }}
                       onPress={() => {
                           onPress ? onPress() : null
                       }}
            />
        </View>
    )
}
export default SearchBar
