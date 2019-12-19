export const Notifications = {

    success(message = '', title = '') {

        if (!message && !title) return;

        if (!title)
            toastr.success(message);
        else
            toastr.success(message, title);
    },

    warning(message = '', title = '') {

        if (!message && !title) return;

        if (!title)
            toastr.warning(message);
        else
            toastr.warning(message, title);
    },

    error(message = '', title = '') {

        if (!message && !title) return;

        if (!title)
            toastr.error(message);
        else
            toastr.error(message, title);
    }
}