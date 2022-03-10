import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import date from "date-and-time";
import { useGetMessageTypes } from "./UseGetMessageTypes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ApplicationLog } from "./UseGetLogs";
import { useEnvironment } from "./EnvironmentProvider";

function LogDisplay({ logs, setHostContains, setUserContains }: { logs: Array<ApplicationLog>; setHostContains: { (host: string): void }; setUserContains: { (user: string): void } }) {
  const environment = useEnvironment();
  const [messageTypes] = useGetMessageTypes(environment);

  function dateFormatter(d: Date) {
    return date.format(d, "MM/DD/YYYY HH:mm:ss");
  }

  function messageTypeFormatter(d: number) {
    try {
      var result = messageTypes.find(({ MessageTypeId }) => MessageTypeId == d);

      if (result === undefined) {
        return "unknown";
      }

      return result.Name;
    } catch (e) {
      return "unknown";
    }
  }

  const expandRow = {
    renderer: (row: ApplicationLog) => (
      <div>
        <div className="d-flex align-items-center">
          <label className="font-weight-bold mr-1 mb-0">User: </label>
          <span className="btn btn-link" onClick={() => setUserContains(row.CurrentUserName)}>
            {row.CurrentUserName}
          </span>
        </div>
        <div className="d-flex align-items-center">
          <label className="font-weight-bold mr-1  mb-0">Host: </label>
          <span className="btn btn-link" onClick={() => setHostContains(row.Host)}>
            {row.Host}
          </span>
        </div>
        <div>
          <label className="font-weight-bold">Error Json:</label>
          <SyntaxHighlighter language="javascript" style={docco}>
            {row.FullErrorJson ? JSON.stringify(row.FullErrorJson, null, 4) : ""}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    expandByColumnOnly: true,
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }: { isAnyExpands: boolean }) => {
      if (isAnyExpands) {
        return <i className="bi bi-caret-down"></i>;
      }
      return <i className="bi bi-caret-right"></i>;
    },
    expandColumnRenderer: ({ expanded }: { expanded: boolean }) => {
      if (expanded) {
        return <i className="bi bi-caret-down"></i>;
      }
      return <i className="bi bi-caret-right"></i>;
    },
  };

  const columns: Array<ColumnDescription> = [
    {
      dataField: "Message",
      text: "Message",
      sort: true,
    },
    {
      dataField: "MessageTypeId",
      text: "Type",
      sort: true,
      formatter: messageTypeFormatter,
    },
    {
      dataField: "DateTime",
      text: "Time",
      formatter: dateFormatter,
      sort: true,
      sortFunc: (a: any, b: any, order: string) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
    },
  ];

  return (
    <div className="p-3">
      <hr />
      <label>Results</label>
      <BootstrapTable bootstrap4 keyField="LogId" data={logs} columns={columns} pagination={paginationFactory({})} expandRow={expandRow} />
    </div>
  );
}

export { LogDisplay };
