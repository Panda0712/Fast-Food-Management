import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Brand = styled.p`
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.webp" alt="Logo" />
      <Brand>FF Shop</Brand>
    </StyledLogo>
  );
}

export default Logo;
