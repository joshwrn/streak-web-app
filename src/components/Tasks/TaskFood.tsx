import { useState, useEffect } from 'react';
import styled from 'styled-components';

import apple from '../../assets/food/apple_NE.png';
import pineapple from '../../assets/food/pineapple_SW.png';
import sushi from '../../assets/food/sushiSalmon_NE.png';
import sundae from '../../assets/food/sundae_NW.png';
import sub from '../../assets/food/sub_SE.png';
import pancakes from '../../assets/food/pancakes_NW.png';

const Food = ({ streak }: { streak: number }) => {
  const [food, setFood] = useState(apple);
  useEffect(() => {
    if (streak <= 3) {
      // 3 days
      setFood(apple);
    } else if (streak > 3 && streak <= 7) {
      // one week
      setFood(pineapple);
    } else if (streak > 7 && streak <= 14) {
      // two weeks
      setFood(sushi);
    } else if (streak > 14 && streak <= 30) {
      // three weeks
      setFood(sundae);
    } else if (streak > 30 && streak <= 45) {
      // one month
      setFood(sub);
    } else if (streak > 45 && streak <= 60) {
      // one month
      setFood(pancakes);
    }
  }, [streak]);
  return <Image src={food} alt="food" />;
};

const Image = styled.img`
  position: relative;
  width: 3.8rem;
  height: 3.8rem;
  z-index: 1;
  object-fit: contain;
`;

export default Food;
