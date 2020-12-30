export interface DependencyRef {
  name: string;
  provider: string;
  url: string;
}

export interface DependencyTagDTO {
  id: string;
  tag: string;
  dependencyRef: DependencyRef;
  deprecated: boolean;
  rejected: boolean;
  underReview: boolean;
  likes: number;
  dislikes: number;
  vote?: 'like' | 'dislike';
}

export interface TagDTO {
  name: string;
  dependencyTags: DependencyTagDTO;
  isExpanded?: boolean;
}
