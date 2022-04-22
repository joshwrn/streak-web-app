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
    // 3 days
    if (streak <= 3) return setFood(apple);
    // one week
    if (streak > 3 && streak <= 7) return setFood(pineapple);
    // two weeks
    if (streak > 7 && streak <= 14) return setFood(sushi);
    // three weeks
    if (streak > 14 && streak <= 30) return setFood(sundae);
    // one month
    if (streak > 30 && streak <= 45) return setFood(sub);
    // one month
    if (streak > 45 && streak <= 60) return setFood(pancakes);
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
