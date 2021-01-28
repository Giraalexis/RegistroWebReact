import './App.css';

import Links from './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container container-fluid">
      <div className="row pt-4">
        <Links/>
      </div>
      <ToastContainer/>
      
    </div>
    
  );
}

export default App;
