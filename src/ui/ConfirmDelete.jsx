import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Xóa {resourceName}</Heading>
      <p>
        Bạn có chắc muốn xóa trực tiếp {resourceName} không? Không thể hoàn tác.
      </p>

      <div>
        <Button
          onClick={onCloseModal}
          variation="secondary"
          disabled={disabled}
        >
          Đóng
        </Button>
        <Button onClick={onConfirm} variation="danger" disabled={disabled}>
          Xóa
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
