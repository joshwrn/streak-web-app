import TopBar from '../components/TopBar/TopBar';
import BottomSection from '../components/BottomBar/BottomSection';
import LevelUp from '../components/LevelUp/LevelUp';
import Scene from '../components/Pet/PetScene';

const Home = () => {
  return (
    <>
      <TopBar />
      <Scene />
      <BottomSection />
      <LevelUp />
    </>
  );
};

export default Home;
