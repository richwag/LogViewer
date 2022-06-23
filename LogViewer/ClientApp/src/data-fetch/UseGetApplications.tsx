import { useEffect, useState } from "react";
import { config } from "../config";
import { Application } from "../data-types/Application";

const pleaseChoose: Application = {
    ApplicationId: "-1",
    ApplicationName: "Please Choose",
};

function useGetApplications(
    environment: string | null
): [Array<Application>, boolean, string | null] {
    const [apps, setApps] = useState<Array<Application>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                setBusy(true);

                const response = await fetch(
                    `${config.server_prefix_url}ErrorManagement/ApplicationInfos?environment=${environment}`,
                    {
                        mode: "cors",
                        credentials: "include",
                    }
                );

                setBusy(false);

                if (response.ok) {
                    var tmpApps: Array<Application> = await response.json();
                    tmpApps.sort((a, b) => {
                        return a.ApplicationName.localeCompare(
                            b.ApplicationName
                        );
                    });
                    tmpApps.splice(0, 0, pleaseChoose);
                    setApps(tmpApps);
                } else {
                    throw Error("Can't retrieve applications");
                }
            } catch (e) {
                setError("Can't retrieve applications");
                setBusy(false);
            }
        };

        if (environment !== null && environment.length) {
            fetchData();
        }
    }, [environment]);

    return [apps, busy, error];
}

export { useGetApplications };
