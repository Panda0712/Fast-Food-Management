/* eslint-disable react/prop-types */

import { formatCurrency } from "../../utils/helpers";
import { useDeleteFood } from "./useDeleteFood";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateFood } from "./useCreateFood";

import styled from "styled-components";
import CreateFoodForm from "./CreateFoodForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ food }) => {
  const { isDeleting, deleteFood } = useDeleteFood();
  const { createFood } = useCreateFood();

  const { id: foodId, name, regularPrice, discount, image, description } = food;

  function handleDuplicate() {
    createFood({
      name: `Nhân bản ${name}`,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt={`${name}`} />
      <Cabin>{name}</Cabin>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={foodId} />

            <Menus.List id={foodId}>
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Sao chép
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Xóa</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateFoodForm foodToEdit={food} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteFood(foodId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
