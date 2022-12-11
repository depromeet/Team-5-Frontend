import { theme } from '@depromeet/theme';
import styled from '@emotion/styled';

export const Page = styled.div`
  background-color: ${theme.colors.gray120};
  color: ${theme.colors.white};
`;

export const Section = styled.section`
  margin-top: 50px;
`;

export const FlexRow = styled.div`
  display: flex;
`;

export const QuizListWrapper = styled.div`
  /* max-width: 982px; */
  width: 982px;
`;

export const RankingListWrapper = styled.div`
  width: 304px;
`;
