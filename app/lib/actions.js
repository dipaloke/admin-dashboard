"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

//ADD USER

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

//UPDATE User

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData); // getting data from form body

  try {
    connectToDB();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };
    // if formFields are empty or undefined then delete the fields from updateFields,
    // otherwise we will be using the data from form fields and update our user.

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
  //successful creation of new user will update userPage
  revalidatePath("/dashboard/users");
  // after user creation redirect to user Page from userAdd page
  redirect("/dashboard/users");
};

//DELETE USER

export const deleteUser = async (FormData) => {
  const { id } = Object.fromEntries(FormData); // getting data from form body

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
  //successful deletion of product will update productPage
  revalidatePath("/dashboard/users");
};

//ADD PRODUCT

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
  //successful creation of new product will update productPage
  revalidatePath("/dashboard/products");
  // after product creation redirect to product Page from productAdd page
  redirect("/dashboard/products");
};

//UPDATE PRODUCT

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData); // getting data from form body

  try {
    connectToDB();
    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };
    // if formFields are empty or undefined then delete the fields from updateFields,
    // otherwise we will be using the data from form fields and update our user.

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }
  //successful creation of new user will update userPage
  revalidatePath("/dashboard/products");
  // after user creation redirect to user Page from userAdd page
  redirect("/dashboard/products");
};

//DELETE PRODUCT

export const deleteProduct = async (FormData) => {
  const { id } = Object.fromEntries(FormData); // getting data from form body

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
  //successful deletion of product will update productPage
  revalidatePath("/dashboard/products");
};
