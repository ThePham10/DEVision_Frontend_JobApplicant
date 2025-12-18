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
                padding: '16px',
                width: '280px',
                position: 'absolute',
                right: '40px',
                top: '80px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
        >
            {content}
        </Popup>
    );
}