import { useContext, createContext } from "react";

const ReadPageContext = createContext();

export const useReadPageContext = ()=>{
    return useContext(ReadPageContext);
}

export const ReadPageContextProvider = ({children})=>{

    const data = {
        
    }

    return (
        <ReadPageContext.Provider value={data}>
            {children}
        </ReadPageContext.Provider>
    )
}