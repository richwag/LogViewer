import React, { useState, useContext, ReactNode } from "react";

const EnvironmentContext = React.createContext<string | null>(null);
const SetEnvironmentContext = React.createContext<any | null>(null);

export function useEnvironment() {
    return useContext(EnvironmentContext);
}

export function useSetEnvironment() {
    return useContext(SetEnvironmentContext);
}

type EnvironmentContextProps = {
    children: ReactNode;
}

export function EnvironmentContextProvider({ children } : EnvironmentContextProps) {
    const [environment, setEnvironment] = useState<string>('');
    return (
        <EnvironmentContext.Provider value={environment}>
            <SetEnvironmentContext.Provider value={setEnvironment}>
                {children}
            </SetEnvironmentContext.Provider>
        </EnvironmentContext.Provider>
    )
}

