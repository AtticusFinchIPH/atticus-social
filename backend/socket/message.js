import moment from "moment";

const formatMessage = (nickName, text) => {
    return {
        nickName,
        text,
        time: moment().format('h:mm a')
    }
}

export {formatMessage};