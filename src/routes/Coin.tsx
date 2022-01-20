import {Helmet} from 'react-helmet';
import {useQuery} from 'react-query';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import {fetchCoinInfo, fetchCoinTickers} from '../api';
import Chart from './Chart';
import Price from './Price';

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 720px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${props => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
  gap: 30px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.bgColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin: 20px 0px;
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${props => props.theme.bgColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive?: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
    transition: all 0.2s ease-in;
    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  const {coinId} = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
  );
  const {isLoading: tickersLoading, data: tickersData} = useQuery<TickersData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    },
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
      </Header>
      <BackWrapper></BackWrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <DescriptionWrapper>
            <Description>{infoData?.description}</Description>
          </DescriptionWrapper>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Centralize:</span>
              <span>{infoData?.org_structure}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch != null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch != null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab>
              <Link to={'/'}>Home</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} tickersData={tickersData} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
