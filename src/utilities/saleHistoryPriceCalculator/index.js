import moment from 'moment';
import {filteredSoldItems} from '../../database/services/soldItemService';

export function TodaySaleHistory() {
  const outputArr = {
    '02-04AM': 0,
    '04-06AM': 0,
    '06-10AM': 0,
    '10-12AM': 0,
  };

  const morning2 = new Date();
  morning2.setHours(8, 0, 0);
  const upTo4 = new Date();
  upTo4.setHours(10, 0, 0);
  const upTo6 = new Date();
  upTo6.setHours(12, 0, 0);
  const upTo10 = new Date();
  upTo10.setHours(18, 0, 0);
  const upTo12 = new Date();
  upTo12.setHours(19, 0, 0);

  const checkOne = filteredSoldItems(0).map(item => {
    if (
      moment(item.sold_date).format('HH:mm:ss A') >
        moment(morning2).format('HH:mm:ss A') &&
      moment(item.sold_date).format('HH:mm:ss A') <
        moment(upTo4).format('HH:mm:ss A')
    ) {
      outputArr['02-04AM'] += item.total_price;
    } else if (
      moment(item.sold_date).format('HH:mm:ss A') >
        moment(upTo4).format('HH:mm:ss A') &&
      moment(item.sold_date).format('HH:mm:ss A') <
        moment(upTo6).format('HH:mm:ss A')
    ) {
      outputArr['04-06AM'] += item.total_price;
    } else if (
      moment(item.sold_date).format('HH:mm:ss A') >
        moment(upTo6).format('HH:mm:ss A') &&
      moment(item.sold_date).format('HH:mm:ss A') <
        moment(upTo10).format('HH:mm:ss A')
    ) {
      outputArr['06-10AM'] += item.total_price;
    } else if (
      moment(item.sold_date).format('HH:mm:ss A') >
        moment(upTo10).format('HH:mm:ss A') &&
      moment(item.sold_date).format('HH:mm:ss A') <
        moment(upTo12).format('HH:mm:ss A')
    ) {
      outputArr['10-12AM'] += item.total_price;
    }
  });

  return outputArr;
}

export function weeklySaleHistory() {
  const outputArr = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  filteredSoldItems(7).map(item => {
    switch (moment(item.sold_date).format('ddd')) {
      case 'Mon':
        outputArr.Mon += item.total_price;
        break;
      case 'Tue':
        outputArr.Tue += item.total_price;
        break;
      case 'Wed':
        outputArr.Wed += item.total_price;
        break;
      case 'Thu':
        outputArr.Thu += item.total_price;
        break;
      case 'Fri':
        outputArr.Fri += item.total_price;
        break;
      case 'Sat':
        outputArr.Sat += item.total_price;
        break;
      case 'Sun':
        outputArr.Sun += item.total_price;
        break;
      default:
        break;
    }
  });

  return outputArr;
}

export function MonthlySaleHistory() {
  const outputArr = {
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
  };

  const today = new Date();
  const Week4_start = new Date(today);
  Week4_start.setDate(today.getDate() - 7);
  const Week3_start = new Date(today);
  Week3_start.setDate(today.getDate() - 14);
  const Week2_start = new Date(today);
  Week2_start.setDate(today.getDate() - 21);
  const Week1_start = new Date(today);
  Week1_start.setDate(today.getDate() - 30);

  const final = filteredSoldItems(30).map(item => {
    if (item.sold_date > Week4_start) {
      outputArr.Week4 += item.total_price;
    } else if (item.sold_date > Week3_start && item.sold_date < Week4_start) {
      outputArr.Week3 += item.total_price;
    } else if (item.sold_date > Week2_start && item.sold_date < Week3_start) {
      outputArr.Week2 += item.total_price;
    } else if (item.sold_date > Week1_start && item.sold_date < Week2_start) {
      outputArr.Week1 += item.total_price;
    }
  });

  return outputArr;
}
