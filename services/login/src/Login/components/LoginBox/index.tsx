import { Button, Image, Text } from '@depromeet/toks-components';
import { Spacing } from '@toss/emotion-utils';
import { useRouter } from 'next/router';
import { emoji } from '@depromeet/toks-components';

import { Wrapper } from '../../../common/style';

export function LoginBox() {
  const router = useRouter();
  const onClick = () => {
    router.push('https://api.tokstudy.com/oauth2/authorize/kakao');
  };

  return (
    <Wrapper>
      <Image src={emoji.studying} width={170} height={170} alt="toks-emoji" />
      <Spacing size={15} />
      <Text variant="title04">개발자를 위한 스터디, 똑스-잇!</Text>
      <Spacing size={93} />
      <Button onClick={onClick} type={'general'}>
        {/* TODO: kakao icon  */}
        Kakao 로그인
      </Button>
    </Wrapper>
  );
}
