/* eslint-disable react/prop-types */
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

const Stats = ({ orders }) => {
  const numOrders = orders.filter((o) => o.status === "paid").length;

  console.log(orders);

  const sales = orders.reduce(
    (acc, order) =>
      order.status === "paid" ? acc + order.totalPrice : acc + 0,
    0
  );

  return (
    <>
      <Stat
        title="Đơn hàng"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="Doanh thu"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
    </>
  );
};

export default Stats;
