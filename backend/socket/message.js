import moment from "moment";

const formatMessage = (nickname, text) => {
    return {
        nickname,
        text,
        time: moment().format('h:mm a')
    }
}

export {formatMessage};