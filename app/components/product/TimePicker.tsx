
import dayjs from 'dayjs';
import { TimePicker } from 'antd';

const format = 'HH:mm';

const TimePickerApp: React.FC = () => <TimePicker defaultValue={dayjs('12:08', format)} format={format} minuteStep={15}  />;

export default TimePickerApp;