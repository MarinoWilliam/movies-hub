import Navbar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';

import './HomePage.css'

const HomePage: React.FC = () => {

  return (
    <div >
      <Navbar />
      <div className='homePageContainer' >
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
