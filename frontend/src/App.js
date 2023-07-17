import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Discover from './components/Discover';
import Post from './components/Post';
import EditSearch from './components/EditSearch';
import Edit from './components/Edit';
import Apply from './components/Apply';
import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='discover' element={<Discover />} />
          <Route path ='post' element={<Post />} />
          <Route path='edit-search' element={<EditSearch />} />
          <Route path='edit' element={<Edit />} />
          <Route path='apply' element={<Apply />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
