import { Spacing } from '@toss/emotion-utils';
import { QuizNav } from 'common/components/QuizNav';
import { QuizQuestion } from 'common/components/QuizQuestion';

export default function QuizVotingPage() {
  return (
    <>
      <QuizNav mainTitle="똑스 풀기" studyId={1} />
      <Spacing size={25} />

      <QuizQuestion />
    </>
  );
}
