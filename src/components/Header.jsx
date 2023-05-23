import { NavLink } from 'react-router-dom';
import logo from '../assets/logoipsum-244.svg';
import Navbar from './Navbar';
import { MainHeader } from './styles/Elements';

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
