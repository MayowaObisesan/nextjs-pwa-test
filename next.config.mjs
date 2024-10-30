import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    disable: false,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    workboxOptions: {
        disableDevLogs: true,
    },
    // fallbacks: {
    //     image: '/android/android-launchericon-144-144.png',
    //     // document: '../app/offline',  // if you want to fallback to a custom page other than /_offline
    //     // font: '/static/font/fallback.woff2',
    //     // audio: ...,
    //     // video: ...,
    // }
});

export default withPWA({
    // Your Next.js config
});