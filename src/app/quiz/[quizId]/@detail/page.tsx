import clsx from 'clsx';

import { QuizButton, Thumbnail } from '@/app/quiz/components';
import { getQuizDetailByQuizId } from '@/app/quiz/remotes/quiz';
import { Text, bgColor } from '@/common';

type Props = {
  params: {
    quizId: string;
  };
};

async function DetailPage({ params: { quizId } }: Props) {
  const {
    quiz: {
      title,
      tags,
      question: {
        imageUrl: oxImageUrl,
        buttons: { '1': button1, '2': button2 },
      },
      quizType,
    },
    isSubmitted,
  } = await getQuizDetailByQuizId(quizId);

  return (
    <section className={clsx(bgColor['gray110'], 'mt-8px rounded-16px p-20px')}>
      <Text className="block" typo="captionBold" color="primaryDefault">
        {tags.join(' ')}
      </Text>
      <Text className="mt-12px block " typo="headingL" color="gray10">
        {title}
      </Text>
      <div className="mt-48px">
        {oxImageUrl && (
          <Thumbnail
            className="mb-24px"
            imageUrl={oxImageUrl}
            name="OX퀴즈 설명"
          />
        )}
        <div className="flex gap-16px">
          {quizType.startsWith('A_B_') ? (
            <>
              <QuizButton
                isSubmitted={isSubmitted}
                imageUrl={button1.imageUrl}
                percentage={55}
                participationLabel="60% (600명)"
                isSelected={true}
                name={button1.button.name}
              />
              <QuizButton
                isSubmitted={isSubmitted}
                imageUrl={button2.imageUrl}
                percentage={45}
                participationLabel="40% (400명)"
                isSelected={false}
                name={button2.button.name}
              />
            </>
          ) : (
            <>
              <QuizButton
                isSubmitted={isSubmitted}
                OXType={quizType === 'O_X_IMAGE' ? undefined : 'O'}
                name="예"
              />
              <QuizButton
                isSubmitted={isSubmitted}
                OXType={quizType === 'O_X_IMAGE' ? undefined : 'X'}
                name="아니오"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
