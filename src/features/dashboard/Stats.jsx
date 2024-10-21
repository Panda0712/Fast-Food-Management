import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

const Stats = ({ orders }) => {
  const numOrders = orders.length;

  const sales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

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
