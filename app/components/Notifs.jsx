import { useEffect } from "react";
import { useState } from "react";

export const NotifInfoIcon = () => {
    return (
        <svg className="flex-shrink-0 h-4 w-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
    )
}

export const NotifSuccessIcon = () => {
    return (
        <svg class="flex-shrink-0 h-4 w-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
    )
}

export const NotifErrorIcon = () => {
    return (
        <svg class="flex-shrink-0 h-4 w-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    )
}

export const NotifBellIcon = () => {
    return (
        <svg class="h-5 w-5 text-gray-600 mt-1 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}

export const NotifWarningIcon = () => {
    return (
        <svg class="flex-shrink-0 h-4 w-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
    )
}

export const TemporaryNotif = ({ time, classes, children }) => {
    const [hideChild, setHideChild] = useState(false);
    let timeout;

    useEffect(() => {
        return () => clearTimeout(timeout);
    }, [hideChild, timeout]);

    if (time < 1) return <></>;
    timeout = setTimeout(() => { console.log('timeout', time); setHideChild(true) }, time);

    return <section className={`${classes}`}>{!hideChild && children}</section>
}

export const NotifTemplate = ({ icon, title, noTitle = false, message, children }) => {
    return (
        <div className="lg:max-w-sm w-full mx-auto bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-base-200 dark:border-gray-700" role="alert">
            <div className="flex p-4">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ms-3">
                    {
                        !noTitle
                        && <h3 className="text-gray-800 font-semibold dark:text-white">
                            {title}
                        </h3>
                    }
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                        {message}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const NotifInfo = ({ icon, title, noTitle = false, message, children }) => {
    return (
        <NotifTemplate
            icon={icon || <NotifInfoIcon />}
            message={message}
            title={title}
            noTitle={noTitle}
        >
            {children}
        </NotifTemplate>
    )
}

export const NotifSuccess = ({ icon, title, noTitle = false, message, children }) => {
    return (
        <NotifTemplate
            icon={icon || <NotifSuccessIcon />}
            message={message}
            title={title}
            noTitle={noTitle}
        >
            {children}
        </NotifTemplate>
    )
}

export const NotifWarning = ({ icon, title, noTitle = false, message, children }) => {
    return (
        <NotifTemplate
            icon={icon || <NotifWarningIcon />}
            message={message}
            title={title}
            noTitle={noTitle}
        >
            {children}
        </NotifTemplate>
    )
}

export const NotifError = ({ icon, title, noTitle = false, message, children }) => {
    return (
        <NotifTemplate
            icon={icon || <NotifErrorIcon />}
            message={message}
            title={title}
            noTitle={noTitle}
        >
            {children}
        </NotifTemplate>
    )
}