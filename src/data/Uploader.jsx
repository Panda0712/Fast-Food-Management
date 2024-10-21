import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../ui/Button";

import { orders } from "./data-bookings";
import { foods } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteFoods() {
  const { error } = await supabase.from("foods").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteOrders() {
  const { error } = await supabase.from("orders").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createFoods() {
  const { error } = await supabase.from("foods").insert(foods);
  if (error) console.log(error.message);
}

async function createOrders() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: foodsIds } = await supabase
    .from("foods")
    .select("id")
    .order("id");
  const allFoodIds = foodsIds.map((cabin) => cabin.id);

  const finalOrders = orders.map((order) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const food = foods.at(order.foodId - 1);
    const foodPrice = food.regularPrice - food.discount;
    const totalPrice = foodPrice;

    let status;
    if (order.isPaid) status = "paid";
    if (order.status === "unconfirmed") status = "unconfirmed";
    if (!order.isPaid) status = "unpaid";

    return {
      ...order,
      foodPrice,
      totalPrice,
      guestId: allGuestIds.at(order.guestId - 1),
      foodId: allFoodIds.at(order.foodId - 1),
      status,
    };
  });

  console.log(finalOrders);

  const { error } = await supabase.from("orders").insert(finalOrders);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteOrders();
    await deleteGuests();
    await deleteFoods();

    // Bookings need to be created LAST
    await createGuests();
    await createFoods();
    await createOrders();

    setIsLoading(false);
  }

  async function uploadGuests() {
    setIsLoading(true);
    await deleteGuests();
    await createGuests();
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteOrders();
    await createOrders();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>DỮ LIỆU MẪU</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Tải lên TẤT CẢ
      </Button>

      <Button onClick={uploadGuests} disabled={isLoading}>
        Chỉ dữ liệu khách hàng
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Chỉ dữ liệu đặt hàng
      </Button>
    </div>
  );
}

export default Uploader;
