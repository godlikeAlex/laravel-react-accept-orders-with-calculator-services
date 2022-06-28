import dayJS from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayJS.extend(utc);
dayJS.extend(timezone);
dayJS.tz.setDefault('America/New_York');

const dayjs = (date) => {
    return dayJS.tz(new Date(date))
}

export const dayjsInstance = dayJS.tz;
export const dayJsMain = dayJS;

export default dayjs;