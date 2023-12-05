import { User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q, "i"); // i means case insensetive
  try {
    connectToDB();
    const users = await User.find({ username: { $regex: regex } }); // username contains the query(this case we will search every single letter using Regex)
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
