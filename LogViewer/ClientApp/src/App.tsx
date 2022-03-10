import { EnvironmentContextProvider } from "./EnvironmentProvider";
import LogViewer from "./LogViewer";

function App() {
    return (
        <EnvironmentContextProvider>
            <LogViewer />
        </EnvironmentContextProvider>
    );
}

export default App;
