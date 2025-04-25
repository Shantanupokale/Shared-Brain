import { Request, Response } from "express";
import { ContentModel, LinkModel, UserModel } from "../models/db";
import { random } from "../utils/random";


// Route 3: Add Content
const addContent = async (req: Request, res: Response) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    const content = await ContentModel.create({
      title,
      link,
      type,
      // @ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json({ message: "Content Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Route 4: Get User Content
const getUserContent = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");

  res.json({ content });
};

// Route 5: Delete User Content
const deleteUserContent = async (req: Request, res: Response) => {
  try {
    const contentId = req.body.Id;
    // @ts-ignore
    const userId = req.userId;
    await ContentModel.deleteOne({
      contentId,
      userId,
    });

    res.json({ message: "deleted content " });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Route 6: Share Content Link
const shareContentLink = async (req: Request, res: Response) => {
  const { share } = req.body;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }

    const hash = random(10);

    await LinkModel.create({
      userId: req.userId,
      hash,
    });

    res.json({ hash });
  } else {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed link" });
  }
};

// Route 7: Get Shared Content
const getSharedContent = async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash });
  if (!link) {
    res.status(404).json({ message: "Invalid share link" });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({
    username: user.username,
    content,
  });
};

// Export all functions at once
export {
  addContent,
  getUserContent,
  deleteUserContent,
  shareContentLink,
  getSharedContent,
};
