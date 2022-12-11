import { theme } from '@depromeet/theme';
import styled from '@emotion/styled';
import { Tag as BaseTag } from 'primereact/tag';
import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

interface TagProps extends Omit<ComponentProps<typeof BaseTag>, 'color'> {
  color?: 'highlight' | 'normal';
}

export function Tag({ color = 'normal', ...restProps }: TagProps) {
  return (
    <Wrapper>
      <StyledTag
        // TODO: inline style로 적용한 부분 제외하기
        style={{
          background: color === 'highlight' ? 'rgba(255, 134, 47, 0.2)' : theme.colors.gray080,
          color: color === 'highlight' ? theme.colors.primary : theme.colors.gray020,
          padding: '4px 12px',
          width: 'fit-content',
          height: '28px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
        }}
        role="listitem"
        {...restProps}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;

  .p-tag span {
    //styleName: body-02;
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.6px;
    text-align: left;
  }
`;

const StyledTag = styled(BaseTag)`
  .p-tag-value {
    //styleName: body-02;
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.6px;
    text-align: left;
  }
`;

interface RowProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

// TODO: maxView 개수 받도록
function Row({ children, ...props }: RowProps) {
  return <ListRow {...props}>{children}</ListRow>;
}

Tag.Row = Row;

const ListRow = styled.ul`
  display: flex;
  gap: 8px;
  overflow: auto;
  padding: 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
