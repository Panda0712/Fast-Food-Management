/* eslint-disable react/prop-types */
import { format, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

import styled from "styled-components";
import DataItem from "../../ui/DataItem";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ order }) {
  const {
    created_at,
    orderTime,
    numFood,
    totalPrice,
    observations,
    isPaid,
    guests: { fullName: guestName, email, nationalID },
    foods: { name: foodName },
  } = order;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numFood} đơn của <span>{foodName}</span>
          </p>
        </div>

        <p>
          {format(new Date(orderTime), "EEEE, dd/MM/yyyy", { locale: vi })} (
          {isToday(new Date(orderTime))
            ? "Hôm nay"
            : formatDistanceFromNow(orderTime)}
          )
        </p>
      </Header>

      <Section>
        <Guest>
          <p>{guestName}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Căn cước: {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Ghi chú"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Thanh toán?">
          {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Tổng giá`}>
            {formatCurrency(totalPrice)}
          </DataItem>

          <p>{isPaid ? "Đã thanh toán" : "Thanh toán khi nhận hàng"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Đặt hàng vào{" "}
          {format(new Date(created_at), "EEEE, dd/MM/yyyy, p", { locale: vi })}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
