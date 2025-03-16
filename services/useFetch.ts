// import { useEffect, useState } from "react";
//
// const useFetch = <T>(fetchFunction: () => Promise<T>, dependencies: any[] = []) => {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<Error | null>(null);
//
//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const fetchedData = await fetchFunction();
//             console.log("Fetched Data:", fetchedData); // 🛠 Додали лог для перевірки
//             setData(fetchedData);
//         } catch (e) {
//             setError(e as Error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const reset = () => {
//         setData(null);
//         setLoading(false);
//         setError(null);
//     };
//
//     useEffect(() => {
//         fetchData();
//     }, dependencies);
//
//     return { data, loading, error, refetch: fetchData, reset };
// };
//
// export default useFetch;
