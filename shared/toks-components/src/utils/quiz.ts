import { QuizStatus } from '@depromeet/toks-components';
import { format } from 'date-fns';

export const getQuizItemStatus = (openDate: Date, limitDate: Date) => {
  const currentDate = new Date();

  if (limitDate.getTime() <= currentDate.getTime()) 
    return 'DONE';
  if (currentDate.getTime() < openDate.getTime()) 
    return 'TO_DO';
  
  return 'IN_PROGRESS';
};

export const getTimerByQuizStatus = (
  currentDate: Date,
  duration: number,
  limitDate: Date,
  quizItemStatus: QuizStatus
) => {
  const getTimerValue = {
    DONE: "00:00:00",
    TO_DO: convertMilliSecondToString(duration),
    IN_PROGRESS: calculateRemainingTimerValue(currentDate, limitDate),
  }
  return getTimerValue[quizItemStatus];
};

const convertTimeFormat = (num: number) => (num < 10 ? `0${num}` : num);

const convertMilliSecondToString = (millisecond: number) => {
  const day = Math.floor(millisecond / (1000 * 60 * 60 * 24));
  millisecond -= day * (1000 * 60 * 60 * 24);
  const hour = Math.floor(millisecond / (1000 * 60 * 60));
  millisecond -= hour * (1000 * 60 * 60);
  const minute = Math.floor(millisecond / (1000 * 60));
  millisecond -= minute * (1000 * 60);
  const second = Math.floor(millisecond / 1000);

  return `${convertTimeFormat(hour)}:${convertTimeFormat(minute)}:${convertTimeFormat(second)}`;
};

const calculateRemainingTimerValue = (currentDate: Date, limitDate: Date) => {
  const remainingTime = limitDate.getTime() - currentDate.getTime();
  if (remainingTime < 0) {
    return '00:00:00';
  }

  return convertMilliSecondToString(remainingTime);
};
