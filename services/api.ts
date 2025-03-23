
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}
export const fetchMovies = async ({query, page=1}: { query: string, page? : number }) => {
    try {
        const endpoint = query
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${query}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=true&include_video=true&sort_by=revenue.desc&page=${page}`;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}