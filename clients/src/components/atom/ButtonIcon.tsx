import React from 'react';

interface ButtonIconProps {
    onClick?: () => void;
    icon: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, onClick }) => {
    return (
        <button onClick={onClick}>
            {icon}
        </button>
    );
}

export default ButtonIcon;
