import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getOrders({ filter, sortBy, page }) {
  let query = supabase
    .from("orders")
    .select("*,foods(name),guests(fullName,email)", { count: "exact" })
    .order("created_at", { ascending: false });

  // FILTER
  if (filter)
    query = query
      .eq(filter.field, filter.value)
      .order("created_at", { ascending: false });

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Không thể lấy dữ liệu orders");
  }
  return { data, count };
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, foods(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Không tìm thấy đơn hàng!");
  }

  return data;
}

export async function getOrdersAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    .select("created_at, foodPrice, totalPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Không thể tải các đơn hàng!");
  }

  return data;
}

export async function getOrdersForDate(date) {
  const localDate = new Date(date);

  const startDate = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      0,
      0,
      0,
      0
    )
  );

  const endDate = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      23,
      59,
      59,
      999
    )
  );

  const { data, error } = await supabase
    .from("orders")
    .select("created_at, foodPrice, totalPrice,status")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Không thể tải các đơn hàng!");
  }

  return data.map((order) => ({
    ...order,
    created_at: new Date(order.created_at).toISOString(),
  }));
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, guests(fullName)")
    .gte("orderTime", date)
    .lte("orderTime", getToday());

  if (error) {
    console.error(error);
    throw new Error("Không thể tải dữ liệu đơn hàng!");
  }

  return data;
}

export async function updateOrder(id, obj) {
  const { data, error } = await supabase
    .from("orders")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Không thể cập nhật đơn hàng!");
  }
  return data;
}

export async function deleteOrder(id) {
  const { data, error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Không thể xóa đơn hàng!");
  }
  return data;
}
