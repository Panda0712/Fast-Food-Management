import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "paid", label: "Đã thanh toán" },
          { value: "unpaid", label: "Chưa thanh toán" },
        ]}
      />

      <SortBy
        options={[
          { value: "numFood-asc", label: "Theo lượng món tăng" },
          { value: "numFood-desc", label: "Theo lượng món giảm" },
          {
            value: "totalPrice-asc",
            label: "Giá tăng dần",
          },
          { value: "totalPrice-desc", label: "Giá giảm dần" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
