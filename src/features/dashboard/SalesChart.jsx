/* eslint-disable react/prop-types */

import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../hooks/useDarkMode";
import { format } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ orders, date }) => {
  const { isDarkMode } = useDarkMode();

  const displayDate = date
    ? format(new Date(date), "dd/MM/yyyy")
    : format(new Date(), "dd/MM/yyyy");

  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      hour: `${hour}:00`,
      totalSales:
        orders
          ?.filter((order) => {
            const orderDate = new Date(order.created_at);
            return orderDate.getHours() === i;
          })
          .reduce(
            (acc, cur) =>
              cur.status === "paid" ? acc + cur.totalPrice : acc + 0,
            0
          ) || 0,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">Doanh thu ngày {displayDate}</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={hourlyData}>
          <XAxis
            dataKey="hour"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="đ"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Doanh thu"
            unit="đ"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
