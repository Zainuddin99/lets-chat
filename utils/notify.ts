import { Store } from "react-notifications-component";

type NotifyType = "success" | "info" | "danger" | "warning";

export const notify = (type: NotifyType, message: string, title?: string) => {
    Store.addNotification({
        type,
        message,
        //Include title only if exists in parameter
        ...(title && { title }),
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
        },
    });
};
