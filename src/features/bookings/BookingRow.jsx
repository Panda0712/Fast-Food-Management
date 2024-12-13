/* eslint-disable react/prop-types */

import { isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import { useDeleteOrder } from "./useDeleteOrder";

import styled from "styled-components";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  order: {
    id: orderId,
    orderTime,
    numFood,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    foods: { name: foodName },
  },
}) {
  const statusToTagName = {
    canceled: "red",
    paid: "green",
    unpaid: "silver",
  };

  const { isDeletingOrder, deleteOrder } = useDeleteOrder();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{foodName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(orderTime))
            ? "Hôm nay"
            : formatDistanceFromNow(orderTime)}{" "}
          &rarr; {numFood} món
        </span>
        <span>{totalPrice}</span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={orderId} />
          <Menus.List id={orderId}>
            <Menus.Button
              onClick={() => navigate(`/orders/${orderId}`)}
              icon={<HiEye />}
            >
              Xem thông tin
            </Menus.Button>

            {status === "unpaid" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/payment/${orderId}`)}
              >
                Đã thanh toán
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa đơn hàng</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeletingOrder}
            resourceName="đơn hàng"
            onConfirm={() => deleteOrder(orderId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
