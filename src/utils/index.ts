//防抖
export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}
//获取时间 - d: 时间 f: ymd-年月日 ym-年月 y-年
export function parseDate(d: any, f: string) {
  let date = d || new Date();
  let format = f || 'ymd';
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  switch (format) {
    case 'y':
      return `${year}`;
    case 'ym':
      return `${year}-${month}`;
    case 'ymd':
      return `${year}-${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
}
//获取时间区间 - t： ymd-年月日 ym-年月 y-年  /  n: 多少
export function getTimeRange(t: any, n: number) {
  let end = new Date();
  let start = new Date();
  let type = t || 'ymd';
  let num;
  let tempYear, tempMonth, tempArr;
  switch (type) {
    case 'y':
      num = n || 10;
      return [`${start.getFullYear() - num + 1}`, `${end.getFullYear()}`];
    case 'ym':
      num = n || 12;
      tempYear = end.getFullYear();
      tempMonth = end.getMonth() + 1;
      tempArr = [parseDate(new Date(`${tempYear}-${tempMonth}`), 'ym')];
      for (let i = 0; i < num - 1; i++) {
        if (tempMonth == 1) {
          tempMonth = 12;
          tempYear -= 1;
        } else {
          tempMonth -= 1;
        }
        if (i == num - 2) {
          tempArr.unshift(parseDate(new Date(`${tempYear}-${tempMonth}`), 'ym'));
        }
      }
      return tempArr;
    case 'ymd':
      num = n || 7;
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (num - 1));
      return [parseDate(start, type), parseDate(end, type)];
  }
}
