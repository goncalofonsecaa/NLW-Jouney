import dayjs from "dayjs";
import localizadeFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(localizadeFormat);

export { dayjs };