import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
const Navigation = (props) => (
    <Nav pills>
        <NavItem>
            <NavLink tag={RRNavLink} to='/'>Movies</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RRNavLink} to='/search'>Search</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RRNavLink} to='/watchlist'>WatchList</NavLink>
        </NavItem>
    </Nav>
);
export default Navigation;