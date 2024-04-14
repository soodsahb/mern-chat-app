import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserid = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserid },
    }).select("-password"); //every user in database except current one

    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.log("Error in getting users for sidebar", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
