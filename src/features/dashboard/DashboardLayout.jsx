// import styled from "styled-components";
// import { useRecentOrders } from "./useRecentOrders";
// import Spinner from "../../ui/Spinner";
// import Stats from "./Stats";
// import SalesChart from "./SalesChart";

// const StyledDashboardLayout = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: auto 34rem auto;
//   gap: 2.4rem;
// `;

// const DashboardLayout = () => {
//   const { orders, isLoading, numDays } = useRecentOrders();

//   if (isLoading) return <Spinner />;

//   return (
//     <StyledDashboardLayout>
//       <Stats orders={orders} />
//       <SalesChart orders={orders} numDays={numDays} />
//     </StyledDashboardLayout>
//   );
// };

// export default DashboardLayout;

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentOrders } from "./useRecentOrders";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { orders, isLoading, date } = useRecentOrders();

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats orders={orders} />
      <SalesChart orders={orders} date={date} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
