import React from 'react';
import './Navigation.less';
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Avatar, Tooltip, Button, Space, Dropdown } from "antd";
import { ReconciliationOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

// Array of items for the dropdown menu
const items = [
    {
        key: '1',
        label: (
            <Link to={'/dashboard'}>
                Your profile
            </Link>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'sign-out',
        label: (
            <span>Sign out</span>
        ),
    },
];

const Navigation = () => {
    // Access the isLoggedIn and userData state from the Redux store
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate(); // Navigation function from react-router-dom
    const dispatch = useDispatch(); // Dispatch function from react-redux

    return (
        <div className={'wrapper-header'}>
            <div className="container">
                <div className="nav-warp">
                    <ReconciliationOutlined className={'brand-logo'}/>
                    <span className={'brand-title'}>Health</span>
                    <ul className="nav">
                        <CustomLink to={"/"}>Home</CustomLink>
                        <CustomLink to={"/comparison"}>Comparison</CustomLink>
                        <CustomLink to={"/leaderboard"}>Leaderboard</CustomLink>
                        <CustomLink to={"/answer"}>Answer</CustomLink>
                        <CustomLink to={"/food-price"}>Food Price</CustomLink>
                    </ul>
                </div>
                <div className="account">
                    {isLoggedIn ? (
                        // Render the dropdown menu and user information if the user is logged in
                        <>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: ({ key }) => {
                                        if (key === 'sign-out') {
                                            // Dispatch the logout action and navigate to the homepage
                                            dispatch(logout());
                                            navigate('/');
                                        }
                                    }
                                }}
                                placement="topRight"
                                overlayClassName={'account-info-menu'}
                            >
                                <div className={'account-info'}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined/>}/>
                                    <span>{userData.username}</span>
                                </div>
                            </Dropdown>
                            <Tooltip title="Setting">
                                <Button shape="circle" icon={<SettingOutlined/>}/>
                            </Tooltip>
                        </>
                    ) : (
                        // Render the sign in and sign up links if the user is not logged in
                        <Space>
                            <Link to={'/login'}>
                                Sign in
                            </Link>
                            <Link to={'/register'} className={'register'}>
                                Sign up
                            </Link>
                        </Space>
                    )}
                </div>
            </div>
        </div>
    );
};

// CustomLink component for rendering navigation links with active state
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to); // Resolves the path for matching
    const isActive = useMatch({ path: resolvedPath.pathname, end: true }); // Checks if the current path matches the link

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navigation;
