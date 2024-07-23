'use client'
import { Children, useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const ItemType = 'IMAGE';

const DraggableImage = ({ index, moveImage, ...props }) => {
    const [, drag] = useDrag({
        type: ItemType,
        item: { index }
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveImage(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return <div ref={(node) => drag(drop(node))} {...props} />
};

export default function Sortable({ value, onChange, className, children }) {

    let [width, setWidth] = useState(),
        moveImage = (fromIndex, toIndex) => {
            const updatedImages = [...value];
            const [movedImage] = updatedImages.splice(fromIndex, 1);
            updatedImages.splice(toIndex, 0, movedImage);
            onChange(updatedImages);
        }

    useEffect(() => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            setWidth(true)
        }
    }, [])

    return (
        <DndProvider backend={width ? TouchBackend : HTML5Backend}>
            <div className={className}>
                {Children.map(children, (child, i) => (
                    <DraggableImage key={i} index={i} moveImage={moveImage}>
                        {child}
                    </DraggableImage>
                ))}
            </div>
        </DndProvider>
    );
};

