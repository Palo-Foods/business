import { useStates } from "./useStates";

export const useCrud = () => {
    const { loading, message, setMessage, setLoading, error, setError } = useStates()
    
    const handleCrud = async (method, url, body = null) => {
        const session = sessionStorage.getItem("user")
        const user = JSON.parse(session)

        const config = {
            method,
            headers: {
            contentType: "application/json",
            Authorization: `Bearer ${user?.authToken}`,
            },
            timeout: 5000,
            body: JSON.stringify(body),
        };

    try {
        const response = await fetch(url, config);

        setLoading(false);
        
        const result = await response.json();

        if (response.statusText != "ok") {
            setError(result?.msg || error);
        } else {
            setMessage(result?.msg);
            return
        }
    } catch (error) {
        return {error: error.message}
    }  
}

    return {handleCrud, loading, message, error}
}