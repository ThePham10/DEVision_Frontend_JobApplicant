import React from 'react';
import Popup from 'reactjs-popup';

export type PopUpBoxProps = {
    trigger: React.ReactElement;
    content: React.ReactNode;
};

export const PopUpBox = ({ trigger, content }: PopUpBoxProps) => {
    return (
        <Popup
            trigger={<div>{trigger}</div>}
            position={['top left']}
            closeOnDocumentClick={true}
            closeOnEscape={true}
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
