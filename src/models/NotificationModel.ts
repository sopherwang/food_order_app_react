class NotificationModel {
    status: string
    title: string
    message: string


    constructor(status: string, title: string, message: string) {
        this.status = status;
        this.title = title;
        this.message = message;
    }
}

export default NotificationModel