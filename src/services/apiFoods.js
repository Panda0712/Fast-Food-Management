import supabase, { supabaseUrl } from "./supabase";

export async function getFoods() {
  const { data, error } = await supabase.from("foods").select("*");

  if (error) {
    console.error(error);
    throw new Error("Không thể tải dữ liệu món");
  }

  return data;
}

export async function createEditFood(newFood, id) {
  const hasImagePath = newFood.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newFood.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newFood.image
    : `${supabaseUrl}/storage/v1/object/public/food-images/${imageName}`;
  // https://iizqqbdczorzypgneais.supabase.co/storage/v1/object/public/food-images/hamburger-001.jpeg
  // 1. Tạo/chỉnh sửa món
  let query = supabase.from("foods");

  // A. Tạo món
  if (!id) query = query.insert([{ ...newFood, image: imagePath }]);

  // B. Chỉnh sửa món
  if (id)
    query = query
      .update({ ...newFood, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Không thể tạo món");
  }

  // 2. Upload ảnh lên database
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("food-images")
    .upload(imageName, newFood.image);

  // 3. Xóa món nếu có lỗi khi upload ảnh
  if (storageError) {
    await supabase.from("foods").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Không thể tải ảnh món và món chưa được tạo!");
  }

  return data;
}

export async function deleteFood(id) {
  const { data, error } = await supabase.from("foods").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Không thể xóa món");
  }
  return data;
}
