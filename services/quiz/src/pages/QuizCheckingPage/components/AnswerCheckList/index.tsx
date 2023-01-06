import { calculateRemainingSecond } from '@depromeet/toks-components/src/utils';
import { getQuizById } from 'common/components/QuizQuestion/remotes/quiz';
import { QUERY_KEYS } from 'constants/queryKeys';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Text } from '@depromeet/toks-components';
import { Flex, Spacing } from '@toss/emotion-utils';
import { DoneNumberNotice } from 'common/components/DoneNumberNotice';
import { getUser } from 'common/remotes/user';
import { useEffect, useState } from 'react';
import { AnswerWrapper, BestAnswerContainer, Wrapper } from './style';
import { getSortedQuizReplyById } from 'pages/QuizCheckingPage/remotes/sortingQuizAply';
import { AnswerCheckItem } from '../AnswerCheckItem';

export function AnswerCheckList() {
  const {
    query: { quizIdParams },
  } = useRouter();
  const [durationTime, setDurationTime] = useState<number>();

  const { data: quiz } = useQuery(QUERY_KEYS.GET_QUIZ_BY_ID, () => getQuizById(quizIdParams), {
    enabled: Boolean(quizIdParams),
  });

  useEffect(() => {
    if (quiz) {
      setDurationTime(calculateRemainingSecond(new Date(quiz.timestamp), new Date(quiz.endedAt)));
    }
  }, [durationTime]);

  const { data: sortedQuizReplies } = useQuery(
    QUERY_KEYS.GET_SORTED_QUIZREPLY,
    () => getSortedQuizReplyById(quizIdParams),
    {
      enabled: Boolean(quizIdParams),
    }
  );

  const { data: user } = useQuery(QUERY_KEYS.GET_USER_INFO, getUser);

  if (!sortedQuizReplies || !user) {
    return null;
  }

  const sortedPeerAnswers = sortedQuizReplies.quizReplyHistories.filter(
    element => element.creator.nickname !== user.nickname
  );

  const bestAnswer = sortedQuizReplies.quizReplyHistories[0];
  const restAnswer = sortedQuizReplies.quizReplyHistories.filter(
    element => element.quizReplyHistoryId !== bestAnswer.quizReplyHistoryId
  );

  if (durationTime == null || durationTime <= 0) {
    return (
      <Wrapper>
        <BestAnswerContainer>
          <Flex css={{ justifyContent: 'space-between' }}>
            <Text variant="headline" color="gray030">
              우수한 답변
            </Text>
            <Text variant="body02" color="gray050">
              잘한다잘한다하니까 너무 잘한다🙊
            </Text>
          </Flex>
          <Spacing size={'2vh'} />
          <AnswerCheckItem
            creator={bestAnswer.creator}
            answer={bestAnswer.answer}
            likeCount={bestAnswer.likeCount}
            isFold={false}
          />
        </BestAnswerContainer>
        <Spacing size={'7vh'} />
        <Flex css={{ justifyContent: 'space-between' }}>
          <Text variant="headline" color="gray030">
            팀원들의 답안 확인
          </Text>
          <Text variant="body02" color="gray050">
            울지말고 강해져라..!👊🏻
          </Text>
        </Flex>
        <Spacing size={'2vh'} />
        <AnswerWrapper>
          {restAnswer.map(({ answer, likeCount, creator }) => (
            <AnswerCheckItem answer={answer} likeCount={likeCount} creator={creator} isFold={true} />
          ))}
        </AnswerWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Flex direction="column">
          <Flex css={{ justifyContent: 'space-between' }}>
            <Text variant="headline" color="gray030">
              팀원들의 답안 확인
            </Text>
            <DoneNumberNotice done={sortedPeerAnswers.length} />
          </Flex>
          <Flex direction="column" css={{ overflow: 'auto' }}>
            <Spacing size={'2vh'} />
            {sortedPeerAnswers.map(({ answer, likeCount, creator }) => (
              <AnswerCheckItem answer={answer} likeCount={likeCount} creator={creator} isFold={false} />
            ))}
          </Flex>
        </Flex>
      </Wrapper>
    );
  }
}
