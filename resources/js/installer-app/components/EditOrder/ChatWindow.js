import React from 'react';
import AuthLayout from '../Layouts/AuthLayout';

const ChatWindow = ({isOpen, closeChat}) => {

    if (!isOpen) return null;

    return (
        <AuthLayout>
            <h2>Hello world</h2>
        </AuthLayout>
    )
};

export default ChatWindow;