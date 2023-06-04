import React, {Component} from 'react';
import './App.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {

    render() {
        return <div>
            <Navbar color="dark">
                    <NavbarBrand tag={Link} to="/" color='white'>Menu</NavbarBrand>
               </Navbar>
        </div>;
    }
}