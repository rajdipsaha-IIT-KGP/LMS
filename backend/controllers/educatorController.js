import { clerkClient } from "@clerk/express";

export const updateRoleEducator = async (req, res) => {
  try {
    const { userId } = await req.auth();

    console.log("userId =", userId);
console.log(await req.auth());
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};