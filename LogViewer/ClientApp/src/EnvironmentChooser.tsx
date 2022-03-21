import { useEffect, useState } from "react";
import { useSetEnvironment } from "./EnvironmentProvider";
import { config } from "./config";

export function EnvironmentChooser() {
    const setEnvironment = useSetEnvironment();
    const [environments, setEnvironments] = useState<string[]>([]);

    const choose = "CHOOSE";

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${config.server_prefix_url}ErrorManagement/EnvironmentNames`,
                    {
                        mode: "cors",
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    setEnvironments(await response.json());
                } else {
                    throw new Error("can't get environments");
                }
            } catch (e) {
                setEnvironments([]);
            }
        }

        fetchData();
    }, []);

    function environmentChange(environment: string) {
        if (environment !== choose) {
            setEnvironment(environment);
        }
    }

    return (
        <>
            <label>Environment</label>
            <div>
                <select
                    className="form-control"
                    onChange={(e) => environmentChange(e.target.value)}
                >
                    <option key="-1" value={choose}>
                        Please Choose...
                    </option>
                    {environments.map((e: string, i: number) => (
                        <option key={i} value={e}>
                            {e}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
