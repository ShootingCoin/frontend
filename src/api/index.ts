import axios from 'axios'

const BE_ORIGIN = process.env.BE_ORIGIN;

const match = async (price: number, uuid: string) => {
  await axios.post(`${BE_ORIGIN}/v1/match`, {
    price,
    uuid,
  });
};

const api = {
  match,
};

export default api;
