import React, { ReactNode, useContext, useState } from "react";

const EnvironmentContext = React.createContext<string | null>(null);
const SetEnvironmentContext = React.createContext<any | null>(null);

// Context for reading the current environment
export function useEnvironment() {
    return useContext(EnvironmentContext);
}

// Context for setting the current environment
export function useSetEnvironment() {
    return useContext(SetEnvironmentContext);
}

type EnvironmentContextProps = {
    children: ReactNode;
};

// Wrap our contexts in a context provider component
export function EnvironmentContextProvider({
    children,
}: EnvironmentContextProps) {
    const [environment, setEnvironment] = useState<string>("");
    return (
        <EnvironmentContext.Provider value={environment}>
            <SetEnvironmentContext.Provider value={setEnvironment}>
                {children}
            </SetEnvironmentContext.Provider>
        </EnvironmentContext.Provider>
    );
}
