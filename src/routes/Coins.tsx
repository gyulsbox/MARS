import List from 'list.js';
import {Helmet} from 'react-helmet';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components';
import {fetchCoins} from '../api';
import {isDarkAtom} from '../atom';

const Contatiner = styled.div`
  padding: 0px 20px;
  max-width: 1080px;
  margin: 0 auto;
  @media only screen and (max-width: 430px) {
    max-width: 350px;
    padding: 0px 10px;
  }
`;

const Header = styled.header`
  height: 23vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
  }
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  justify-content: center;

  @media only screen and (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const Coin = styled.li`
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.2s ease-in;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: white;
    }
    background-color: ${props => props.theme.accentColor};
  }

  @media only screen and (max-width: 430px) {
    a {
      padding: 10px;
    }
  }
`;

const Loader = styled.span`
  font-size: 32px;
  text-align: center;
  display: block;
  margin-top: 50px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled(Img)`
  font-size: 48px;
  width: 400px;
  height: 223.5897435897436px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 0px;

  @media only screen and (max-width: 430px) {
    width: 300px;
    height: 167.69230769230768px;
  }
`;

const Search = styled.input`
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 50px;
  background: white;
  outline: none;
  padding: 0 60px 0 20px;
  font-size: var(--font-regular);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: 0;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const {isLoading, data} = useQuery<ICoin[]>('allCoins', fetchCoins);
  setTimeout(() => {
    let options = {
      valueNames: ['name'],
    };
    let userList = new List('hacker-list', options);
  }, 1000);

  return (
    <Contatiner id="hacker-list">
      <Helmet>
        <title>MARS!</title>
      </Helmet>

      <Header>
        <Title src="/img/hug.jpg" />
        <div>
          <CheckBoxWrapper>
            <CheckBox onClick={toggleDarkAtom} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
          <Search
            className="search"
            type="text"
            placeholder="Which is your Mars Ticket?"
          />
        </div>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList className="list">
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                className="name"
                to={{
                  pathname: `/${coin.id}`,
                  state: {name: coin.name},
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Contatiner>
  );
}

export default Coins;
