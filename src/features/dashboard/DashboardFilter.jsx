// import Filter from "../../ui/Filter";

// function DashboardFilter() {
//   return (
//     <Filter
//       filterField="last"
//       options={[
//         { value: "7", label: "7 ngày qua" },
//         { value: "30", label: "30 ngày qua" },
//         { value: "90", label: "90 ngày qua" },
//       ]}
//     />
//   );
// }

// export default DashboardFilter;
import styled from "styled-components";

import { useSearchParams } from "react-router-dom";

const StyledDateFilter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: "#fff";
  color-scheme: dark;
`;

function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  function handleChange(e) {
    searchParams.set("date", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <StyledDateFilter>
        <label>Chọn ngày:</label>
        <StyledInput type="date" value={date} onChange={handleChange} />
      </StyledDateFilter>
    </>
  );
}

export default DashboardFilter;
