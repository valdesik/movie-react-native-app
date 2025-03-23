import {View, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";

interface SearchBarProps {
    onPress?: () => void,
    placeholder?: string,
    value?: string,
    onChangeText?: (text: string) => void
}

const SearchBar = ({onPress, placeholder, value, onChangeText}: SearchBarProps) => {
    return (
        <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="w-5 h-5" resizeMode='contain' tintColor='#AB8bff'/>
            <TextInput placeholder={placeholder}
                       placeholderTextColor="#AB8bff"
                       className="flex-1 text-white text-base ml-2"
                       value={value}
                       onChangeText={onChangeText}
                       onPress={() => {
                           onPress ? onPress() : null
                       }}
            />
            {onPress && (
                <TouchableOpacity onPress={onPress}>
                    <Image source={icons.person} className="w-5 h-5 ml-2" tintColor="#AB8bff" />
                </TouchableOpacity>
            )}
        </View>
    )
}
export default SearchBar
