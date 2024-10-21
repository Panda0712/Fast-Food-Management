import { useOrders } from "./useOrders";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, orders, count } = useOrders();

  if (isLoading) return <Spinner />;

  if (!orders.length) return <Empty resourceName="đơn hàng" />;

  return (
    <Menus>
      <Table columns="1fr 2fr 2fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Món</div>
          <div>Khách hàng</div>
          <div>Thời gian</div>
          <div>Trạng thái</div>
          <div>Số lượng</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => <BookingRow key={order.id} order={order} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
