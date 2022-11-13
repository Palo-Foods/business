import { useEffect, useState } from "react";
import { useStates } from "./useStates";

export const useCrud = (url) => {
    const [data, setData] = useState(null)
    const { loading, message, setMessage, setLoading, error, setError, router } = useStates()

    
    const handleCrud = async (method, url, body = null) => {
        const session = sessionStorage.getItem("user")
        const user = JSON.parse(session)
        setError(null)

        const config = {
            method,
            headers: {
            contentType: "application/json",
            Authorization: `Bearer ${user?.authToken}`,
            },
            timeout: 5000,
            body: body && JSON.stringify(body),
        };
       
        try {
            setLoading(true);
            const response = await fetch(url, config);
            
            const result = await response.json();
            console.log(response)

            setLoading(false);

            if (response.status === 500) {
                setError(result?.msg);
                return
            }

            if (!response.ok) {
                setError(result?.msg);
            } else {
                setMessage(result?.msg || "Success");
                return
            }
        } catch (error) {
            setError(error.message)
        }  
    }
    
    const handlefetchData = async (url) => {
        const session = sessionStorage.getItem("user")
        const user = JSON.parse(session)
        setError(null)

        const config = {
            method: "GET",
            headers: {
            contentType: "application/json",
            Authorization: `Bearer ${user?.authToken}`,
            },
            timeout: 5000
        };

        try {
            setLoading(true);
            const response = await fetch(url, config);

            const result = await response.json();

            console.log(result)

            setLoading(false);

            if (response.status === 500) {
                setError(result?.msg);
                return
            }

            if (response.status === 404) {
                setData(result);
                return
            }

            if (!response.ok) {
                setError(result?.msg);
            } else {
                setData(result);
                return
            }
        } catch (error) {
            setError(error.message)
        }  
    }

    useEffect(() => {
        const getData = async() => {
            await handlefetchData(url)
        }

        if (router.isReady) {
            if (url) {
                getData()
            }
        }
    }, [router, url])

    return {handleCrud, loading, message, error, data, handlefetchData}
}