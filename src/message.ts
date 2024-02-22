import moment from "moment";

function formatMessage(userName: string, text: string) {
  return {
    userName,
    text,
    time: moment().format('h:mm a'),
  };
}

export default formatMessage;
