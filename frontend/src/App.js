import Home from '@/pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from '@/components';
import Comparison from '@/pages/Comparison';
import Leaderboard from './pages/Leaderboard';
import Answer from './pages/Answer';
import Login from './pages/Login';
import Register from './pages/Register';
import { ConfigProvider } from 'antd';
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import store from './store';

function App() {

    return (
        <>
            <Provider store={store}>
                <ConfigProvider>
                    {/* Render the navigation component */}
                    <Navigation />
                    {/* Set up the routes */}
                    <Routes>
                        {/* Define the routes and their corresponding components */}
                        <Route path="/" element={<Home />} />
                        <Route path="/comparison" element={<Comparison />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/answer" element={<Answer />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </ConfigProvider>
            </Provider>
        </>
    )
}

export default App;
