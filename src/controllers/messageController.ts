import { Request, Response } from "express";
import { User, Message } from "../models";
import { Op } from "sequelize";

export const getMessenge = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderId: userId1,
            receiverId: userId2,
          },
          {
            senderId: userId2,
            receiverId: userId1,
          },
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    return res.json(messages);
  } catch (error) {
    console.error(error, req, res);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};

export const getChatted = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const sentMessages = await Message.findAll({
      where: { senderId: userId },
      attributes: ["receiverId"],
      group: ["receiverId"],
    });

    const receiverdMessages = await Message.findAll({
      where: { receiverId: userId },
      attributes: ["senderId"],
      group: ["senderId"],
    });

    const chattedUserIds = new Set([
      ...sentMessages.map((msg) => msg.receiverId),
      ...receiverdMessages.map((msg) => msg.senderId),
    ]);

    const chattedUsers = await User.findAll({
      where: { id: Array.from(chattedUserIds) },
      attributes: ["id", "username"],
    });

    res.json(chattedUsers);
  } catch (error) {
    console.error("Failed to get chatted users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { sender: senderId, receiver: receiverId, message } = req.body;
  try {
    const messages = await Message.create({
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });
    return res.json(messages);
  } catch (error) {
    console.error(error, req, res);
    return res.status(500).json({ error: "error when send message" });
  }
};
