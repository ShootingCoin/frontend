export default function runPhysics(eggArray, radius) {
  // check_meet use for checking kiss Eggs
  let check_meet;

  for (let i = 0; i < eggArray.length; i++) {
    if (eggArray[i].speed > 0) {
      // Egg Move
      eggArray[i].x_pos += eggArray[i].x_dir * eggArray[i].speed;
      eggArray[i].y_pos += eggArray[i].y_dir * eggArray[i].speed;
      eggArray[i].speed -= 0.1;

      
      for (let j = 0; j < eggArray.length; j++) {
        check_meet = false;
        if (j != i) {
          while (
            isMeet(
              eggArray[i].x_pos, eggArray[i].y_pos,
              eggArray[j].x_pos, eggArray[j].y_pos,
              radius
            )
          ) {
            if (!check_meet) check_meet = true;
            if (eggArray[i].x_pos > eggArray[j].x_pos) {
              eggArray[i].x_pos = eggArray[i].x_pos + Math.abs(eggArray[i].x_dir);
            } else {
              eggArray[i].x_pos = eggArray[i].x_pos - Math.abs(eggArray[i].x_dir);
            }
            if (eggArray[i].y_pos > eggArray[j].y_pos) {
              eggArray[i].y_pos = eggArray[i].y_pos + Math.abs(eggArray[i].y_dir);
            } else {
              eggArray[i].y_pos = eggArray[i].y_pos - Math.abs(eggArray[i].y_dir);
            }
          }
          

          if (check_meet) {
            // When Kiss Break direction Degree = A
            // When Kiss Other Egg's direction between origin Degree = B
            // Calculate Two Egg's direction and speed
            let kiss_dir_x = (eggArray[j].x_pos - eggArray[i].x_pos);
            let kiss_dir_y = (eggArray[j].y_pos - eggArray[i].y_pos);
            let distance = Math.sqrt(kiss_dir_x * kiss_dir_x + kiss_dir_y * kiss_dir_y);

            eggArray[j].x_dir = kiss_dir_x / distance;
            eggArray[j].y_dir = kiss_dir_y / distance;


            let cosB = (eggArray[i].x_dir * eggArray[j].x_dir +
              eggArray[i].y_dir * eggArray[j].y_dir);
            let cosA = Math.sqrt(1 - Math.abs(cosB));

            if (cosA < 0.0001 && cosA > 0) cosA = 0.0001;
            if (cosA > -0.0001 && cosA < 0) cosA = -0.0001;
            if (cosB < 0.0001 && cosB > 0) cosB = 0.0001;
            if (cosB > -0.0001 && cosB < 0) cosB = -0.0001;

            eggArray[i].x_dir = eggArray[i].x_dir - (eggArray[j].x_dir) * cosB;
            eggArray[i].y_dir = eggArray[i].y_dir - (eggArray[j].y_dir) * cosB;

            eggArray[j].speed = eggArray[i].speed * (1 / (cosA * cosA / cosB + cosB));
            eggArray[i].speed = eggArray[i].speed * (1 / (cosB * cosB / cosA + cosA));
            
          }
        }
      }
    }
  };
  // If Egg have Energy Run Again
  let check_remain_energy = false;
  for (let i = 0; i < eggArray.length; i++) {
    if (eggArray[i].speed > 0) {
      check_remain_energy = true;
      break;
    }
  }
  if (check_remain_energy) {
    setTimeout(() => runPhysics(eggArray, radius), 20);
  }
};

// Check is Meet
function isMeet(x1, y1, x2, y2, radius) {
  let distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  if (distance <= radius * 2) {
    return true;
  }
  return false;
};
