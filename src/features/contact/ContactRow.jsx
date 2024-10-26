/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiTrash } from "react-icons/hi2";
import { useDeleteContact } from "./useDeleteContact";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Contact = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span {
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

const ContactRow = ({
  contact: { id: contactId, name, email, phone, content },
}) => {
  const { isDeletingContact, deleteContact } = useDeleteContact();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <Contact>{name}</Contact>

      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{phone}</span>
      </Stacked>

      <Stacked>
        <span>{content}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={contactId} />
          <Menus.List id={contactId}>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa ý kiến</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeletingContact}
            resourceName="Ý kiến"
            onConfirm={() => deleteContact(contactId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default ContactRow;
