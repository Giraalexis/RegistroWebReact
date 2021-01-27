import './App.css';

import Links from './components/Links'
import LinkForm from './components/LinkForm'
function App() {
  return (
    <div className="container container-fluid">
      <div className="row pt-4">
        <LinkForm/>
        <Links/>
      </div>
      
    </div>
    
  );
}

export default App;
