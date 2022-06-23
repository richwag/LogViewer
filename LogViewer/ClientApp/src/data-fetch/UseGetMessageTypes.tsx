import { useEffect, useState } from "react";
import { config } from "../config";

interface MessageType {
    MessageTypeId: number;
    Name: string;
}

function useGetMessageTypes(
    environment: string | null
): [Array<MessageType>, boolean, string | null] {
    const [messageTypes, setMessageTypes] = useState<Array<MessageType>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setBusy(true);

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${config.server_prefix_url}ErrorManagement/MessageTypes?environment=${environment}`,
                    {
                        mode: "cors",
                        credentials: "include",
                    }
                );

                setBusy(false);
                setMessageTypes(await response.json());
            } catch (e) {
                setBusy(false);
                setMessageTypes([]);
                setError("Unable to get message types");
            }
        };

        if (!!environment && environment.length) {
            fetchData();
        }
    }, [environment]);

    return [messageTypes, busy, error];
}

export { useGetMessageTypes };
export type { MessageType };
