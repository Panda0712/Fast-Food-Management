import { useMoveBack } from "../../hooks/useMoveBack";
import { useOrder } from "./useOrder";
import { useNavigate } from "react-router-dom";
import { useDeleteOrder } from "./useDeleteOrder";

import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { order, isLoading } = useOrder();
  const { isDeletingOrder, deleteOrder } = useDeleteOrder();

  const moveBack = useMoveBack();

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: orderId } = order;

  const statusToTagName = {
    unconfirmed: "blue",
    paid: "green",
    unpaid: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Đơn hàng #{orderId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>

      <BookingDataBox order={order} />

      <ButtonGroup>
        {status === "unpaid" && (
          <Button onClick={() => navigate(`/payment/${orderId}`)}>
            Đã thanh toán
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Xóa đơn hàng</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeletingOrder}
              resourceName="đơn hàng"
              onConfirm={() =>
                deleteOrder(orderId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Quay lại
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
