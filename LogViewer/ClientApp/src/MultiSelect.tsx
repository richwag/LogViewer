import { useEffect, useState } from "react";

export interface MultiSelectItem {
    Name: string;
}

export function MultiSelect<T extends MultiSelectItem>({ items, updateSelectedItems }: {
    items: T[],
    updateSelectedItems: { (selectedItems: T[]): void }

}) {
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    useEffect(() => {
        setSelectedItems([]);
    }, [items]);

    function handleClick(item: T) {
        const items: T[] = [...selectedItems] ;

        const existingItemIndex = items.indexOf(item);

        if (existingItemIndex !== -1) {
            items.splice(existingItemIndex, 1);
        }
        else {
            items.push(item);
        }

        setSelectedItems(items);
        updateSelectedItems(items);
    }

    function getItemClassName(item: T): string {
        return selectedItems.indexOf(item) !== -1 ? "list-group-item list-group-item-dark py-1" : "list-group-item py-1";
    }

    return (
        <ul className="list-group">
            {items && items.map((m: T, index: number) => (
                <li key={index} className={getItemClassName(m)} onClick={() => handleClick(m)}>{m.Name}</li>
            ))}
        </ul>
    )
}
