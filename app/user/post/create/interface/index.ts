interface CreateImageDto {
  url?: string;
}

interface CreateTag {
  name: string;
}

interface PostDto {
  id?: number;
  judul: string;
  konten: string;
  images? : CreateImageDto[];
  created_by?: { id: number };
  updated_by?: { id: number };
  tags: CreateTag[];
}

export interface PostCreatePayload extends Pick<PostDto, "judul" | "konten" | "tags" | "images"> {
  files?: File[];
}
export interface PostUpdatePayload extends Pick<PostDto, "judul" | "konten" | "tags" | "images"> {
  files?: File[];
}

  
  interface CreatePostDto {
    judul: string;
    konten: string;
    images: CreateImageDto[];
    created_by?: { id: number };
    tags: CreateTag[];
  }
  