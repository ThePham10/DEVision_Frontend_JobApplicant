import React from 'react';
import Popup from 'reactjs-popup';

export type PopUpBoxProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
};

export const PopUpBox = ({ trigger, content }: PopUpBoxProps) => {
    return (
        <Popup
            trigger={trigger}
            position={['top left']}
            contentStyle={{
                borderRadius: '12px',
                padding: '0',
                minWidth: '280px',
                width: 'auto',
                position: 'absolute',
                right: '40px',
                top: '80px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                overflow: 'visible',
            }}
        >
            {content}
        </Popup>
    );
}
