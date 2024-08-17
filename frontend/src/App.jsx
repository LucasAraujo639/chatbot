
import { Routes, Route, HashRouter } from 'react-router-dom'

import { HomePage } from "./pages/HomePage";
import { LoginPage } from './pages/LoginPage';
import { Provider } from './context/Provider';



// Todo lo que sea "contactos" se refiere a la lista de contactos para ser redirigidos por el chatbot
const App = () => {
  

  return (
    <Provider>
    <HashRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>

    
    </Provider>
  );
};

export default App;
