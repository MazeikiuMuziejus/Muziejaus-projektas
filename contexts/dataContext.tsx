import { createContext, useContext, useState, useEffect } from "react";

import { getData } from "../API/getData";

import type { appData } from "../types";

interface DataContextProps {
    data: appData;
    updateData: () => void;
    loading: boolean;
    error: boolean;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export function DataProvider({children}: any){
    const [data, setData] = useState<appData>([]);  // data is an array of objects
    const [loading, setLoading] = useState<boolean>(true);  // loading state
    const [error, setError] = useState<boolean>(false); // error state

    const updateData = () => {  // function to update data
        setLoading(true);
        getData().then((data) => {
            if (data){
                setData(data);
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        })
    }

    useEffect(() => {   // on mount get data
        updateData();
    }, [])

    return(
        <DataContext.Provider value={{
            data,
            updateData,
            loading,
            error,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    return useContext(DataContext);
}
