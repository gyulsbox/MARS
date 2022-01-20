import {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';

const comeupAnimation = keyframes`
  0% {
    transform: none;
    opacity: 0;
  }
  1% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  main:first-child {
    animation-delay: 0.2s;
  }
  main:nth-child(2) {
    animation-delay: 0.4s;
  }
  main:nth-child(3) {
    animation-delay: 0.6s;
  }
  main:nth-child(4) {
    animation-delay: 0.8s;
  }
  main:nth-child(5) {
    animation-delay: 1s;
  }
  main:last-child {
    animation-delay: 1.2s;
  }
`;

const Overview = styled.main`
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.textColor};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin: 10px 0;
  padding: 20px;
  transform: translateY(-5px);
  opacity: 0;
  animation: ${comeupAnimation} 0.5s linear forwards;
`;

const Tag = styled.h3`
  width: 50%;
  color: ${props => props.theme.bgColor};
  font-size: 12px;
  font-weight: 600;

  @media only screen and (max-width: 430px) {
    font-size: 11px;
  }
`;

const Value = styled.div`
  width: 50%;
`;

const Text = styled.h3<{isPositive?: Boolean}>`
  font-size: 20px;
  font-weight: 600;
  color: ${props => (props.isPositive ? '#79EBA9' : '#e6725b')};
`;

interface PriceProps {
  coinId: string;
  tickersData?: TickersData;
}

interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function checkValue(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}

function Price({coinId, tickersData}: PriceProps) {
  const [data, setData] = useState<TickersData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData(tickersData);
    setLoading(false);
  }, [coinId, tickersData]);

  return (
    <Container>
      {loading ? (
        'Loading Price...'
      ) : (
        <>
          <Overview>
            <Tag>Price :</Tag>
            <Value>
              <Text isPositive={true}>
                $ {data?.quotes.USD.price.toFixed(3)}
              </Text>
            </Value>
          </Overview>
          <Overview>
            <Tag> Change rate (last 15 Minutes):</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_15m) === true
                }
              >
                {data?.quotes.USD.percent_change_15m} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 30 Minutes):</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_30m) === true
                }
              >
                {data?.quotes.USD.percent_change_30m} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 1 hours):</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_1h) === true
                }
              >
                {data?.quotes.USD.percent_change_1h} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 12 hours):</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_12h) === true
                }
              >
                {data?.quotes.USD.percent_change_12h} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 24 hours):</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_24h) === true
                }
              >
                {data?.quotes.USD.percent_change_24h} %
              </Text>
            </Value>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
