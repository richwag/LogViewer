import { Spinner } from "react-bootstrap";
import { Application } from "./Application";
import { useGetApplications } from "./UseGetApplications";
import { FieldError } from "./FieldError";
import { useEnvironment } from "./EnvironmentProvider";

// AppChooser
export function AppChooser(props: { setApp: Function }) {
    const environment = useEnvironment();
    const [apps, busy, error] = useGetApplications(environment);

    function appChange(applicationId: string) {
        if (applicationId !== "-1") {
            props.setApp(
                apps.find(
                    (a: Application) =>
                        a.ApplicationId.toString() === applicationId
                )
            );
        } else {
            props.setApp(undefined);
        }
    }

    return (
        <>
            <label>Application</label>
            <div>
                {!busy && !error && (
                    <select
                        className="form-control"
                        onChange={(e) => appChange(e.target.value)}
                    >
                        {apps.map((a: Application) => (
                            <option
                                key={a.ApplicationId}
                                value={a.ApplicationId}
                            >
                                {a.ApplicationName}
                            </option>
                        ))}
                    </select>
                )}
                {!!busy && (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
                {error && <FieldError errorMessage={error} show={!!error} />}
            </div>
        </>
    );
}
