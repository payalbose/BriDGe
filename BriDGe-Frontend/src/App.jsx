import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { AuthModal } from './modules/auth/AuthModal';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <AuthModal />
    </BrowserRouter>
  );
}

export default App;
