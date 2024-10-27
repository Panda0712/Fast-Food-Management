import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import styled from "styled-components";
import { LuContact } from "react-icons/lu";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Trang chủ</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders">
            <HiOutlineCalendarDays />
            <span>Đơn Hàng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/foods">
            <MdOutlineRestaurantMenu />
            <span>Thực Đơn</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Tài khoản</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/contact">
            <LuContact />
            <span>Ý kiến</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
