import moment from "moment";

export const Utils = {

    generateId() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    },

    formatDate(date, format) {

        if (date) {
            return moment(date).format(format);
        }
        else {
            return moment(Date()).format(format);
        }
	},
	
	isNumber(value) {

		return !isNaN(Number(value));
	}
}