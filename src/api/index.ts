import axios from 'axios'

const HTTP_ORIGIN = process.env.HTTP_ORIGIN;

const match = async (price: number, uuid: string) => {
  await axios.post(`${HTTP_ORIGIN}/v1/match`, {
    price,
    uuid,
  });
};

const endGame = async (gameId: string,{ account, amount }: { account: string, amount: number }) => {
  await axios.post(`${HTTP_ORIGIN}/v1/result/${gameId}`, {
    account,
    amount,
  });
};

const api = {
  match,
  endGame,
};

export default api;
