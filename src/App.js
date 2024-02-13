import React, { useState } from 'react';
import names from './names.json';
import { useVirtualizer } from '@tanstack/react-virtual';

function NameList() {
    const parentRef = React.useRef();
    const [showAllNames, setShowAllNames] = useState(false);

    const rowVirtualizer = useVirtualizer({
        count: showAllNames ? names.length : 100,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 25,

    });

    return (
        <div>
            <button
                style={{
                    padding: '10px',
                    backgroundColor: 'skyblue',
                    outline: 'none',
                    border: '1px solid white',
                    borderRadius: '5px',
                    margin: '1rem'
                }}
                onClick={() => {
                    setShowAllNames(!showAllNames);
                }}
            >
                {showAllNames ? 'Hide All Names' : 'Show All Names'}
            </button>
            <div
                ref={parentRef}
                style={{
                    height: `400px`,
                    overflow: 'auto', // Make it scroll!
                    border: '1px solid black',
                    padding: '1rem',
                    borderRadius: '1rem',
                    marginInline: '1rem',
                    marginTop: '1rem'
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                        <div
                            key={virtualItem.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            ({virtualItem.index + 1}). First Name: {names[virtualItem.index].first}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NameList;
