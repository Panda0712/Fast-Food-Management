import { useContact } from "./useContact";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import ContactRow from "./ContactRow";

const ContactTable = () => {
  const { isLoading, contact, count } = useContact();

  if (isLoading) return <Spinner />;

  if (!contact.length) return <Empty resourceName="Ý kiến" />;

  return (
    <Menus>
      <Table columns="1fr 1.2fr 1fr 1.5fr 3.2rem">
        <Table.Header>
          <div>Khách hàng</div>
          <div>Email</div>
          <div>Số điện thoại</div>
          <div>Nội dung</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={contact}
          render={(contact) => (
            <ContactRow key={contact.id} contact={contact} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default ContactTable;
