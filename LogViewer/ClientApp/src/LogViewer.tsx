import "./App.css";
import { useEffect, useState } from "react";
import { LogDisplay } from "./LogDisplay";
import { MessageTypeChooser } from "./MessageTypeChooser";
import { AppChooser } from "./AppChooser";
import { FieldError } from "./FieldError";
import { MessageType } from "./UseGetMessageTypes";
import { Alert, Spinner } from "react-bootstrap";
import { useGetLogs, LogFilter } from "./UseGetLogs";
import { Application } from "./Application";
import { EnvironmentChooser } from "./EnvironmentChooser";
import { useEnvironment } from "./EnvironmentProvider";

function LogViewer() {
  const environment = useEnvironment();

  const [app, setApp] = useState<Application | undefined>(undefined);
  const [messageTypes, setMessageTypes] = useState<MessageType[]>([]);
  const [messageContains, setMessageContains] = useState("");
  const [logFilter, setLogFilter] = useState<LogFilter | undefined>(undefined);
  const [hostContains, setHostContains] = useState("");
  const [errorJsonContains, setErrorJsonContains] = useState("");
  const [userContains, setUserContains] = useState("");
  const [logs, busy, error] = useGetLogs(logFilter);
  const [showToast, setShowToast] = useState(false);

  // Clear our message types when environment changes
  useEffect(() => {
    setMessageTypes([]);
  }, [environment]);

  // Clear log when filter criteria changes
  useEffect(() => {
    setLogFilter(undefined);
  }, [app, messageTypes, messageContains]);

  // Show error
  useEffect(() => {
    setShowToast(!!error);
  }, [error]);

  function updateLogFilter() {
    if (app === undefined) {
      return;
    }

    if (messageTypes.length === 0) {
      return;
    }

    if (!environment) {
      return;
    }

    var filter: LogFilter = {
      applicationId: app.ApplicationId,
      messageTypes: messageTypes.map((m: MessageType) => m.MessageTypeId).join("|"),
      messageContains: messageContains,
      hostContains: hostContains,
      errorJsonContains: errorJsonContains,
      userContains: userContains,
      page: 0,
      pageSize: 1000,
      environment: environment ? environment : "",
    };

    setLogFilter(filter);
  }

  function updateHostContains(host: string) {
    setHostContains(host);
  }

  function updateUserContains(user: string) {
    setUserContains(user);
  }

  return (
    <div>
      <form className="p-3">
        <div className="form-group">
          <EnvironmentChooser />
          <AppChooser setApp={setApp} />
          <FieldError errorMessage="Please choose an application" show={app === undefined} />
          <MessageTypeChooser setMessageTypes={setMessageTypes} />
          <FieldError errorMessage="Please choose one or more message types" show={messageTypes.length === 0} />
        </div>
        <div className="form-group">
          <label>Message contains: </label>
          <input className="form-control" type="text" onChange={(e) => setMessageContains(e.target.value)}></input>
          <label>User contains: </label>
          <input className="form-control" type="text" onChange={(e) => setUserContains(e.target.value)} value={userContains}></input>
          <label>Host contains: </label>
          <input className="form-control" type="text" onChange={(e) => setHostContains(e.target.value)} value={hostContains}></input>
          <label>Error Json contains: </label>
          <input className="form-control" type="text" onChange={(e) => setErrorJsonContains(e.target.value)}></input>
        </div>
        <Alert show={showToast} variant="danger" onClose={() => setShowToast(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
        <button className="btn btn-primary" type="button" onClick={updateLogFilter}>
          Search
          {!!busy && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </button>
      </form>
      <LogDisplay logs={logs} setHostContains={updateHostContains} setUserContains={updateUserContains} />
    </div>
  );
}

export default LogViewer;
