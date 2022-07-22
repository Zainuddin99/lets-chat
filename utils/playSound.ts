export const notifySound = () => {
    const audio = new Audio("/sounds/message-notifications.wav");
    audio.play();
};
