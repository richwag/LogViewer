import LogViewer from "./components/LogViewer";
import { EnvironmentContextProvider } from "./EnvironmentProvider";

function App() {
    return (
        <EnvironmentContextProvider>
            <LogViewer />
        </EnvironmentContextProvider>
    );
}

export default App;
