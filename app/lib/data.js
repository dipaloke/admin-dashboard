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
    return {count, users};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i"); // i means case insensetive

  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } }) // username contains the query(this case we will search every single letter using Regex)
      .limit(ITEM_PER_PAGE) // limiting 2 items per page
      .skip(ITEM_PER_PAGE * (page - 1)); // skipping first 2 items in second page so on so forth
    return {count, products};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};
