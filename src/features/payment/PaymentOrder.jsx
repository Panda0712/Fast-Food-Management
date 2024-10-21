import { useMoveBack } from "../../hooks/useMoveBack";
import { useOrder } from "../bookings/useOrder";
import { useEffect, useState } from "react";
import { usePaid } from "./usePaid";

import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import Spinner from "../../ui/Spinner";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function PaymentOrder() {
  const [confirm, setConfirm] = useState(false);
  const { order, isLoading } = useOrder();

  useEffect(() => {
    setConfirm(order?.isPaid ?? false);
  }, [order]);

  const moveBack = useMoveBack();
  const { paid, isPaying } = usePaid();

  if (isLoading) return <Spinner />;

  const { id: orderId, guests } = order;

  function handleCheckin() {
    if (!confirm) return;
    paid(orderId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Thanh toán đơn hàng #{orderId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>

      <BookingDataBox order={order} />

      <Box>
        <Checkbox
          checked={confirm}
          disabled={confirm || isPaying}
          onChange={() => setConfirm((confirm) => !confirm)}
          id="confirm"
        >
          Tôi xác nhận {guests.fullName} đã thanh toán đơn hàng
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirm || isPaying} onClick={handleCheckin}>
          Thanh toán đơn hàng #{orderId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Quay lại
        </Button>
      </ButtonGroup>
    </>
  );
}

export default PaymentOrder;
