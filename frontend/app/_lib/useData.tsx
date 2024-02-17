import { useState, useEffect } from "react"

export default function useData(url:string) {
    // Keep track of fetch status and prepare to return a data object
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState([])

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            const controller = new AbortController()
            
            const res = await fetch(url, {signal: controller.signal})
            const data = await res.json()
            
            setData(data)
            setStatus('fetched')

            return () => {
                // we are using AbortController here to abort the connection in our useEffect cleanup
                // this cancels an ongoing request when the component unmounts or a dependency changes (unlikely here but good practice)
                controller.abort()
            }
        };

        fetchData();
    }, [url]);

    return { status, data }
};
