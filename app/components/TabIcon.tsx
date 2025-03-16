import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, Pressable, ImageSourcePropType } from 'react-native';
import {images} from "@/constants/images";

interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title }) => {
    const [isPressed, setIsPressed] = useState(false);

    const activeColor = focused || isPressed ? "#FFD700" : "#A8B5DB"; // Зміна кольору на активний

    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >
            {focused ? (
                <ImageBackground
                    source={images.highlight}
                    className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Image source={icon} tintColor="#151312" className="w-5 h-5" />
                    <Text className="text-secondary text-base font-semibold ml-2">
                        {title}
                    </Text>
                </ImageBackground>
            ) : (
                <View className="justify-center items-center mt-4">
                    <Image source={icon} tintColor={activeColor} className="w-5 h-5" />
                </View>
            )}
        </Pressable>
    );
};

export default TabIcon;