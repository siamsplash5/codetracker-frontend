import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logoipsum-244.svg';
import Navbar from './Navbar';

const MainHeader = styled.header`
    padding: 0 4.8rem;
    height: 10rem;
    font-size: 1.8rem;
    background-color: ${({ theme }) => theme.colors.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        height: auto;
    }
`;

export default function Header() {
    return (
        <MainHeader>
            <NavLink to="/">
                <img src={logo} alt="logo" className="logo" />
            </NavLink>
            <Navbar />
        </MainHeader>
    );
}
