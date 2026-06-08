import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    console.log("User ID:", userId);

    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      return res.status(401).json({
        message: "You are not authorized to create Course",
      });
    }

    next();
  } catch (err) {
    console.log("Middleware Error:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};