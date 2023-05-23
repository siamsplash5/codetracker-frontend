// importing packages
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// importing components
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

// importing styles
import GlobalStyle from './components/styles/Global.style';
import theme from './components/styles/Theme.style';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
