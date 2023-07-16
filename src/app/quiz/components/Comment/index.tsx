import Image from 'next/image';

import { ICON_URL, Text } from '@/common';

import { CommentList } from './CommentList';
import LikeButton from './LikeButton';

interface CommentProps {
  commentId: number;
  profileImgUrl: string | undefined;
  name: string;
  timeAgo: string;
  comment: string;
  like: number;
}
export function Comment({
  commentId,
  profileImgUrl,
  name,
  timeAgo,
  comment,
  like,
}: CommentProps) {
  return (
    <li>
      <div className="flex items-center gap-x-6px">
        <Image
          src={profileImgUrl ?? ICON_URL.EMOJI_BASE_GRAY}
          alt="프로필 아이콘"
          width={24}
          height={24}
        />
        <Text typo="bodyBold" color="white">
          {name}
        </Text>
        <Text typo="caption" color="gray60">
          {timeAgo}
        </Text>
      </div>
      <div className="ml-30px mt-4px">
        <Text typo="body" color="gray20">
          {comment}
        </Text>
        <LikeButton
          commentid={commentId}
          className="mt-8px"
          like={like}
          isLiked={false}
        />
      </div>
    </li>
  );
}

Comment.List = CommentList;
