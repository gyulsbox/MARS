import {useQuery} from 'react-query';
import {fetchCoinHistory} from '../api';
import ApexChart from 'react-apexcharts';
import {useRecoilValue} from 'recoil';
import {isDarkAtom} from '../atom';

interface ChartProps {
  coinId: string;
}

interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({coinId}: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const {isLoading, data} = useQuery<IData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    },
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          height={315}
          series={[
            {
              data: data?.map(price => ({
                x: price.time_close.slice(5, 10).replace('-', '/'),
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: '100%',
              background: 'transparent',
              toolbar: {
                autoSelected: 'pan',
                show: false,
              },
            },
            yaxis: {
              labels: {
                formatter: value => `$${value.toFixed(2)}`,
                style: {
                  colors: isDark ? 'white' : '#594E45',
                },
              },
            },
            xaxis: {
              labels: {
                style: {
                  colors: isDark ? 'white' : '#594E45',
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: isDark ? '#79EBA9' : '#5B89A6',
                  downward: isDark ? '#e6725b' : '#F25835',
                },
              },
            },
            tooltip: {
              enabled: true,
              theme: 'dark',
              custom: function ({seriesIndex, dataPointIndex, w}) {
                const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                return (
                  '<div class="apexcharts-tooltip-candlestick">' +
                  '<div>Open: $<span class="value">' +
                  o.toFixed(2) +
                  '</span></div>' +
                  '<div>High: $<span class="value">' +
                  h.toFixed(2) +
                  '</span></div>' +
                  '<div>Low: $<span class="value">' +
                  l.toFixed(2) +
                  '</span></div>' +
                  '<div>Close: $<span class="value">' +
                  c.toFixed(2) +
                  '</span></div>' +
                  '</div>'
                );
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
