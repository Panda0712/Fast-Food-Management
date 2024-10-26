import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getContact({ page }) {
  let query = supabase.from("contact").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Không thể lấy dữ liệu ý kiến khách hàng");
  }
  return { data, count };
}

export async function deleteContact(id) {
  const { data, error } = await supabase.from("contact").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Không thể xóa ý kiến này!");
  }
  return data;
}
