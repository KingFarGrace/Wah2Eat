import React from 'react';
import './Navigation.less';
import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {Avatar, Tooltip, Button, Space, Dropdown} from "antd";
import {ReconciliationOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@/features/auth/authSlice';

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

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    </ul>
                </div>
                <div className="account">
                    {isLoggedIn ? (
                        <>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: ({key}) => {
                                        if (key === 'sign-out') {
                                            dispatch(logout());
                                            navigate('/');
                                        }
                                    }
                                }}
                                placement="topRight"
                                overlayClassName={'account-info-menu'}
                            >
                                <div className={'account-info'}>
                                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    <span>{userData.username}</span>
                                </div>
                            </Dropdown>
                            <Tooltip title="Setting">
                                <Button shape="circle" icon={<SettingOutlined/>}/>
                            </Tooltip>
                        </>
                    ) : (
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

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navigation;
