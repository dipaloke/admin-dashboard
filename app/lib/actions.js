import { revalidatePath } from "next/cache";
import { User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";


export const addUser = async (FormData) => {
    "use server"
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(FormData); // getting data from form body

  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }
//successful creation of new user will update userPage
  revalidatePath("/dashboard/users")
  // after user creation redirect to user Page from userAdd page
  redirect("/dashboard/users")
};
