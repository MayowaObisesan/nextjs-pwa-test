"use client";

import { useEffect, useRef, useState } from "react";
import { NotifSuccess, TemporaryNotif } from "./Notifs";

const InstallPWA = () => {
    const installContainer = useRef(null);
    const [installable, setInstallable] = useState(false);
    const [showInstallContainer, setShowInstallContainer] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const InstallPWAButton = ({ text }) => {
        const installButton = useRef(null);

        const clickInstallButton = async () => {
            if (!deferredPrompt) {
                console.log("Install prompt not initialized");
                return;
            }

            try {
                const result = await deferredPrompt.prompt();
                console.log("Install prompt was:", result.outcome);

                if (result.outcome === "accepted") {
                    setShowInstallContainer(false);
                    setDeferredPrompt(null);
                }
            } catch (err) {
                console.error('Error during installation:', err);
            }
        }

        return (
            <button
                type="button"
                className="btn btn-success outline-none border-0 h-12 leading-[48px] px-4 rounded-xl"
                ref={installButton}
                onClick={clickInstallButton}
            >
                {text}
            </button>
        );
    }

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setInstallable(true);
        };

        const handleAppInstalled = () => {
            // Clear the deferredPrompt so it can be garbage collected
            setDeferredPrompt(null);
            // Optionally, send analytics event to track successful installs
            console.log('PWA was installed');
            setInstallable(false);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.addEventListener('appinstalled', handleAppInstalled);

            // Check if app is already installed
            if (window.matchMedia('(display-mode: standalone)').matches) {
                setInstallable(false);
            }
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('appinstalled', handleAppInstalled);
            }
        };
    }, []);

    useEffect(() => {
        setShowInstallContainer(installable);
    }, [installable]);

    const closeInstallContainer = () => {
        setShowInstallContainer(false);
    };

    return (
        <>
            {showInstallContainer && (
                <section
                    id="id-install-summary"
                    className="sticky top-[72px] lg:top-[80px] z-10 flex flex-row items-center p-4 bg-gray-200 backdrop-blur-md shadow dark:bg-[#27CE8E]/10 dark:lg:bg-[#27CE8E]/5"
                    ref={installContainer}
                >
                    <button
                        type="button"
                        className="fa fa-times font-14 border-0 bg-transparent square-4 leading-8 text-center relative self-start dark:color-whitesmoke"
                        onClick={closeInstallContainer}
                    />
                    <div className="install-message w-full px-4 dark:color-whitesmoke">
                        Install Website.
                        <div>
                            Installation takes less than 10 seconds
                        </div>
                    </div>
                    <InstallPWAButton text="Install" />
                </section>
            )}
        </>
    );
};

export default InstallPWA;