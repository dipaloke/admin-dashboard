import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i"); // i means case insensetive

  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } }) // username contains the query(this case we will search every single letter using Regex)
      .limit(ITEM_PER_PAGE) // limiting 2 items per page
      .skip(ITEM_PER_PAGE * (page - 1)); // skipping first 2 items in second page so on so forth
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

// FETCH SINGLE USER

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};


//PRODUCTS

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i"); // i means case insensetive

  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } }) // username contains the query(this case we will search every single letter using Regex)
      .limit(ITEM_PER_PAGE) // limiting 2 items per page
      .skip(ITEM_PER_PAGE * (page - 1)); // skipping first 2 items in second page so on so forth
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

// FETCH SINGLE PRODUCT


export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
