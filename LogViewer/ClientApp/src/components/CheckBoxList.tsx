import { useEffect, useState } from "react";
import { MultiSelectItem } from "./MultiSelect";

export function CheckBoxList<T extends MultiSelectItem>({
    items,
    updateSelectedItems,
}: {
    items: T[];
    updateSelectedItems: { (selectedItems: T[]): void };
}) {
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    useEffect(() => {
        setSelectedItems([]);
    }, [items]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, item: T) {
        const items = [...selectedItems];
        const existingIndex = items.indexOf(item);
        const checked = e.target.checked;

        if (existingIndex !== -1) {
            items.splice(existingIndex, 1);
        }

        if (checked) {
            items.push(item);
        }

        setSelectedItems(items);
        updateSelectedItems(items);
    }

    function isChecked(item: T): boolean | undefined {
        return selectedItems.indexOf(item) === -1 ? false : true;
    }

    return (
        <div className="px-2 border rounded">
            {items &&
                items.map((item, index) => (
                    <div className="form-check" key={index}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={"checkbox_list" + index}
                            onChange={(e) => handleChange(e, item)}
                            checked={isChecked(item)}
                        ></input>
                        <label
                            className="form-check-label"
                            htmlFor={"checkbox_list" + index}
                        >
                            {item.Name}
                        </label>
                    </div>
                ))}
        </div>
    );
}
