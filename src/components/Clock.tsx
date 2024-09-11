import cn from 'classnames';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';

interface Props {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  item: IClock;
  onRemove: (id: IClock['id']) => void;
}

function Clock({ className, item, onRemove }: Props) {
  const [time, setTime] = useState<string>(moment().utcOffset(item.timeZone).format("HH:mm:ss"));

  const timerId = setInterval(() => {
    setTime(() => moment().utcOffset(item.timeZone).format("HH:mm:ss"));
  }, 1000);

  useEffect(() => {
    return function cleanup() {
      clearTimeout(timerId)
    };
  });

  return (
    <div className={cn(className, "clock")}>
      <h2 className="clock__title">{item.name}</h2>
      <time className="clock__time" dateTime={time}>{time}</time>
      <button className="clock__btn" type="button" onClick={() => onRemove(item.id)}>✘</button>
    </div>
  );
}

export default Clock;
