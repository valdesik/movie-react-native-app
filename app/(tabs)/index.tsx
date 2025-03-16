import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View,
    SafeAreaView,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/app/components/SearchBar";
import { useRouter } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "@/services/api";
import dayjs from 'dayjs';

export default function Index() {
    const router = useRouter();
    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);

    const loadMovies = async () => {
        if (!hasMore || loading) return;

        try {
            setLoading(true);
            const newMovies = await fetchMovies({ query: "", page });
            console.warn(`📥 Loaded Page ${page}:`, newMovies?.length);

            if (newMovies?.length) {
                setMovies((prevMovies) => [...prevMovies, ...newMovies]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("❌ Error fetching movies:", err);
            setError(true);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            loadMovies();
        }
    }, [loading, hasMore]);

    const renderMovieItem = ({ item }) => (
        <View className="w-1/3 p-2">
            {item.backdrop_path ? (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }}
                    className="w-full h-40 rounded-lg"
                />
            ) : (
                <View className="w-full h-40 rounded-lg bg-gray-800 justify-center items-center">
                    <Text className="text-white">No Image</Text>
                </View>
            )}
            <Text className="text-white text-sm font-semibold mt-2 text-center">
                {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
            </Text>
            <Text className="text-white text-xs text-center">
                {dayjs(item.release_date).format('YYYY-MM-DD')}
            </Text>
            <Text className="text-white text-xs text-center">⭐ {item.vote_average.toFixed(1)}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full h-full z-0" />

            {/* Fixed Header */}
            <View className="absolute top-0 left-0 right-0 bg-primary z-10 pt-4 pb-4 h-21">
                <View className="flex-row justify-between items-center px-4 mt-[50px]">
                    {/* Logo */}
                    <Image source={icons.logo} className="w-12 h-12" />

                    {/*Search */}
                    <View className="flex-1 ml-4">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search"
                        />
                    </View>
                </View>
            </View>

            {/* Main Content with Offset */}
            <View className="flex-1 pt-22">
                {initialLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#FFD700" />
                        <Text className="text-white mt-2">Loading movies...</Text>
                    </View>
                ) : error ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-red-500 text-center">Error loading movies</Text>
                    </View>
                ) : (
                    <FlatList
                        data={movies}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                        }}
                        contentContainerStyle={{
                            paddingTop: 20,
                            paddingBottom: 40,
                        }}
                        renderItem={renderMovieItem}
                        ListFooterComponent={
                            loading ? (
                                <ActivityIndicator
                                    size="large"
                                    color="#FFD700"
                                    className="mt-4 mb-4"
                                />
                            ) : null
                        }
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}