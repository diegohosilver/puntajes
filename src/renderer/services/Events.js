export const Events = {

    emit(name, payload) {

        $(document).trigger(name, [payload]);
    },

    on(name, func) {

        let callback = ($event, $args) => func($args);

        $(document).on(name, callback);
    },

    off(name, func) {

        $(document).off(name, func);
    }
}