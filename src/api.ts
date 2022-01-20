const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  // const CoinInfo = await (await fetch('https://api.coinpaprika.com/v1/coins')).json();
  // return CoinInfo;
  return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json(),
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 14;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`,
  ).then(response => response.json());
}
