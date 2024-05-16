interface IPost {
  id: string;
  thumbnail: string;
  category: string;
  title: string;
  desc: string;
  postID?: string;
  authorID: number;
}

interface IPostItem {
  postID: string;
  id?: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
  authorID: number;
  createdAt: Date;
}

type TPosts = IPost[];

export type { TPosts, IPostItem };
