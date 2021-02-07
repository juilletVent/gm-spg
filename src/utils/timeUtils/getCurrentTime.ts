import moment from "moment";

export function getCurrentTime() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
