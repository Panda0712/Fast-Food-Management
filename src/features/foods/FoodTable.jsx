import { useFoods } from "./useFoods";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import FoodRow from "./FoodRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, foods } = useFoods();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!foods.length) return <Empty resourceName="thực đơn" />;

  // FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filterFoods;
  if (filterValue === "all") filterFoods = foods;
  if (filterValue === "no-discount")
    filterFoods = foods.filter((x) => x.discount === 0);
  if (filterValue === "discount")
    filterFoods = foods.filter((x) => x.discount > 0);

  // SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortFoods = filterFoods.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Món ăn</div>
          <div>Giá</div>
          <div>Khuyến mãi</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortFoods}
          render={(food) => <FoodRow food={food} key={food.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
