import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperation from "../../ui/TableOperations";

const FoodTableOperation = () => {
  return (
    <TableOperation>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "no-discount", label: "Không khuyến mãi" },
          { value: "discount", label: "Khuyến mãi" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Tên (A-Z)" },
          { value: "name-desc", label: "Tên (Z-A)" },
          { value: "regularPrice-asc", label: "Giá tăng dần" },
          { value: "regularPrice-desc", label: "Giá giảm dần" },
          { value: "discount-asc", label: "Khuyến mãi tăng dần" },
          { value: "discount-desc", label: "Khuyến mãi giảm dần" },
        ]}
      />
    </TableOperation>
  );
};

export default FoodTableOperation;
