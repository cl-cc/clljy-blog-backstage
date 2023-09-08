import { defineStore } from 'pinia';
import { Names } from './store-namespace';
type PromiseItem = {
  list: string[];
  num: number[];
};

export const useTestStore = defineStore(Names.Test, {
  state: () => {
    return {
      piechart: {
        list: ['6-3', '6-4', '6-5', '6-6', '6-7', '6-8'],
        num: [5, 20, 36, 10, 10, 20],
      },
      complexPiechart: {
        list: [
          {
            name: 'A类',
            value: '3720',
          },
          {
            name: 'B类',
            value: '2920',
          },
          {
            name: 'C类',
            value: '2200',
          },
          {
            name: 'D类',
            value: '1420',
          },
          {
            name: 'E类',
            value: '3200',
          },
          {
            name: 'F类',
            value: '2420',
          },
          {
            name: 'G类',
            value: '2200',
          },
          {
            name: 'H类',
            value: '1420',
          },
          {
            name: 'I类',
            value: '3200',
          },
          {
            name: 'J类',
            value: '2420',
          },
        ],
        colors: ['#c065e7', '#765deb', '#3862d8', '#6a89E2', '#219CF9', '#6efbbf', '#40c057', '#ffd351', '#ff8e43', '#f56b6d'],
      },
      lineData: {
        list: [
          {
            name: '1月',
            value: 220,
          },
          {
            name: '2月',
            value: 182,
          },
          {
            name: '3月',
            value: 191,
          },
          {
            name: '4月',
            value: 220,
          },
          {
            name: '5月',
            value: 182,
          },
          {
            name: '6月',
            value: 191,
          },
          {
            value: 191,
            name: '7月',
          },
          {
            name: '8月',
            value: 234,
            predict: true,
          },
          {
            name: '9月',
            value: 290,
            predict: true,
          },
          {
            name: '10月',
            value: 330,
            predict: true,
          },
          {
            name: '11月',
            value: 310,
            predict: true,
          },
          {
            name: '12月',
            value: 210,
            predict: true,
          },
        ],
      },
      histogram: {
        list: [
          {
            name: '1月',
            value: 220,
          },
          {
            name: '2月',
            value: 182,
          },
          {
            name: '3月',
            value: 191,
          },
          {
            name: '4月',
            value: 220,
          },
          {
            name: '5月',
            value: 182,
          },
          {
            name: '6月',
            value: 191,
          },
          {
            value: 191,
            name: '7月',
          },
          {
            name: '8月',
            value: 234,
            predict: true,
          },
          {
            name: '9月',
            value: 290,
            predict: true,
          },
          {
            name: '10月',
            value: 330,
            predict: true,
          },
          {
            name: '11月',
            value: 310,
            predict: true,
          },
          {
            name: '12月',
            value: 210,
            predict: true,
          },
        ],
      },
    };
  },
  getters: {},
  actions: {
    setPiechart(): Promise<PromiseItem> {
      return new Promise(resolve => {
        resolve(this.piechart);
      });
    },
  },
});
