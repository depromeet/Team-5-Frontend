import { SSRSuspense } from '@depromeet/toks-components';
import { Flex } from '@toss/emotion-utils';
import { ErrorBoundary } from '@toss/error-boundary';
import { useSuspendedQuery } from '@toss/react-query';

import { QUERY_KEYS } from 'constants/queryKeys';

import StudyCard from '../StudyCard';
import { getMyStudies } from 'pages/MyStudies/remotes/study';

function StudyList() {
  const { data: myStudies } = useSuspendedQuery(QUERY_KEYS.GET_MY_STUDIES, getMyStudies);

  return (
    <Flex css={{ gap: '32px' }} as="ul">
      {myStudies.map(study => (
        <SSRSuspense fallback={<StudyCard.Skeleton />} key={study.id}>
          <StudyCard
            title={study.title}
            tags={study.tags}
            // TODO: 스터디 참여 로직 구현
            onClick={async () => {}}
            memberCount={study.member.length}
            studyId={study.id}
          />
        </SSRSuspense>
      ))}
    </Flex>
  );
}

export default () => (
  // TODO: fallback 개선
  <ErrorBoundary renderFallback={() => null}>
    <SSRSuspense fallback={null}>
      <StudyList />
    </SSRSuspense>
  </ErrorBoundary>
);
