import { useEffect, useState } from "react";
import { config } from "./config";

interface ApplicationLog {
    Message: string;
    MessageTypeId: string;
    DateTimeUtc: string;
    FullErrorJson: string;
    CurrentUserName: string;
    Host: string;
    DateTime: Date;
}

interface LogFilter {
    applicationId: string;
    messageTypes: string;
    messageContains: string;
    hostContains: string;
    errorJsonContains: string;
    userContains: string;
    page: number;
    pageSize: number;
    environment: string;
}

function useGetLogs(
    filter: LogFilter | undefined
): [Array<ApplicationLog>, boolean, string | null] {
    const [logs, setLogs] = useState<Array<ApplicationLog>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                setBusy(true);
                const response = await fetch(
                    `${config.server_prefix_url}ErrorManagement/ApplicationLogs`,
                    {
                        mode: "cors",
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(filter),
                    }
                );
                setBusy(false);

                if (response.ok) {
                    var tempLogs = await response.json();
                    tempLogs.forEach((e: ApplicationLog) => {
                        e.DateTime = new Date(e.DateTimeUtc);
                        e.FullErrorJson = e.FullErrorJson
                            ? JSON.parse(e.FullErrorJson.replace("\r\n", ""))
                            : e.FullErrorJson;
                    });
                    setLogs(tempLogs);
                } else {
                    throw Error("Can't get application logs");
                }
            } catch (e) {
                setBusy(false);
                setError("error");
                setLogs(new Array<ApplicationLog>());
            }
        };

        if (filter) {
            fetchData();
        } else {
            setLogs([]);
        }
    }, [filter]);

    return [logs, busy, error];
}

export { useGetLogs };

export type { LogFilter, ApplicationLog };
