'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { postCommentByQuizId } from '@/app/quiz/remotes/comment';
import { Text } from '@/common/components';
import { bgColor } from '@/common/foundation';

interface CommentFormProps {
  commentCount: number;
  quizId: string;
}

export function CommentForm({ commentCount, quizId }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const router = useRouter();
  return (
    <form
      className={clsx('flex', 'flex-col')}
      onSubmit={(e) => {
        e.preventDefault();
        setComment('');
        router.refresh();
        // postCommentByQuizId(quizId, comment).then(() =>
        //   router.replace(`quiz/${quizId}`)
        // );
      }}
    >
      <Text typo="body" color="white">
        댓글 {commentCount}
      </Text>
      <input
        required
        className="mt-1.5"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={clsx('mt-3', bgColor['primaryDefault'])} type="submit">
        확인
      </button>
    </form>
  );
}
