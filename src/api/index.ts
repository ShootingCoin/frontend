import axios from 'axios'

const HTTP_ORIGIN = process.env.HTTP_ORIGIN;

const match = async (price: number, uuid: string) => {
  await axios.post(`${HTTP_ORIGIN}/v1/match`, {
    price,
    uuid,
  });
};

const api = {
  match,
};

export default api;
