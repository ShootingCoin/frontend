import { player2 } from "src/dummy";

export default function convertGameData(
  data: Array<any>,
) {
  return data.map(x => ({
    ...x,
    x_pos: 500 - x.x_pos,
    y_pos: 500 - x.y_pos,
    x_dir: -1 * x.x_dir,
    y_dir: -1 * x.y_dir,
  }));
};
