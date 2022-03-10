import { CheckBoxList } from "./CheckBoxList";
import { useEnvironment } from "./EnvironmentProvider";
import { useGetMessageTypes, MessageType } from "./UseGetMessageTypes";

// MessageTypeChooser
function MessageTypeChooser(props: { setMessageTypes: Function }) {
    const environment = useEnvironment();
    const [messageTypes] = useGetMessageTypes(environment);

    function updateSelectedItems(items: Array<MessageType> )  {
        props.setMessageTypes(items);
    }

    return (
        <>
            <label>Message Types</label>

            <CheckBoxList<MessageType> items={messageTypes} updateSelectedItems={updateSelectedItems} />

        </>
    )
}
export { MessageTypeChooser }
