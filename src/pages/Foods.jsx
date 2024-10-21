import AddFood from "../features/foods/AddFood";
import FoodTable from "../features/foods/FoodTable";
import FoodTableOperation from "../features/foods/FoodTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Foods() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Thực đơn</Heading>
        <FoodTableOperation />
      </Row>

      <Row>
        <FoodTable />
        <AddFood />
      </Row>
    </>
  );
}

export default Foods;
