"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData); // getting data from form body

  try {
    connectToDB();

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
  revalidatePath("/dashboard/users");
  // after user creation redirect to user Page from userAdd page
  redirect("/dashboard/users");
};

export const addProduct = async (FormData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(FormData); // getting data from form body

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });
    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add product!");
  }
  //successful creation of new user will update userPage
  revalidatePath("/dashboard/products");
  // after user creation redirect to user Page from userAdd page
  redirect("/dashboard/products");
};
