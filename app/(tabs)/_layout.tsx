import { View, Text, ImageBackground, Image, ImageSourcePropType, Pressable } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import * as Haptics from 'expo-haptics';

interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title }) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-8 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" className="w-5 h-5" />
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        );
    } else {
        return (
            <View className="justify-center items-center mt-8">
                <Image source={icon} tintColor="#A8B5DB" className="w-5 h-5" />
            </View>
        );
    }
};

const _Layout = () => {
    const triggerHapticOnLongPress = async () => {
        try {
            // Перша вібрація при довгому натисканні (легкий імпульс)
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (error) {
            console.log('Haptic feedback error on long press:', error);
        }
    };

    const triggerHapticOnPressOut = async () => {
        try {
            // Друга вібрація при відпусканні після довгого натискання (середній імпульс)
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } catch (error) {
            console.log('Haptic feedback error on press out:', error);
        }
    };

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#0f0d23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    position: 'absolute',
                    height: 48,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0d23',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                tabBarButton: (props) => {
                    let longPressed = false; // Змінна для відстеження довгого натискання

                    return (
                        <Pressable
                            {...props}
                            onPressOut={() => {
                                props.onPress(); // Перехід завжди відбувається при відпусканні
                                if (longPressed) {
                                    triggerHapticOnPressOut(); // Вібрація при відпусканні тільки після довгого натискання
                                }
                            }}
                            onLongPress={() => {
                                longPressed = true; // Позначаємо, що було довге натискання
                                triggerHapticOnLongPress(); // Вібрація при довгому натисканні
                            }}
                            delayLongPress={500} // Час для визначення довгого натискання (500 мс за замовчуванням)
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}
                        >
                            {props.children}
                        </Pressable>
                    );
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={images.home} title="Home" />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    headerShown: false,
                    title: 'Saved',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={images.save} title="Saved" />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={images.search} title="Search" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={images.person} title="Profile" />,
                }}
            />
        </Tabs>
    );
};

export default _Layout;