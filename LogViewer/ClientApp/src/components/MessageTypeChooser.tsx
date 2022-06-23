import {
    MessageType,
    useGetMessageTypes,
} from "../data-fetch/UseGetMessageTypes";
import { useEnvironment } from "../EnvironmentProvider";
import { CheckBoxList } from "./CheckBoxList";

// MessageTypeChooser
function MessageTypeChooser(props: { setMessageTypes: Function }) {
    const environment = useEnvironment();
    const [messageTypes] = useGetMessageTypes(environment);

    function updateSelectedItems(items: Array<MessageType>) {
        props.setMessageTypes(items);
    }

    return (
        <>
            <label>Message Types</label>

            <CheckBoxList<MessageType>
                items={messageTypes}
                updateSelectedItems={updateSelectedItems}
            />
        </>
    );
}
export { MessageTypeChooser };
