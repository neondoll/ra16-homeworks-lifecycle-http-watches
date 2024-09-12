import cn from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props {
  className?: HTMLAttributes<HTMLTimeElement>['className'];
  time: string;
}

function ClockTime({ className, time }: Props) {
  const date = time.split(':');
  let hours = Number(date[0]);
  const minutes = Number(date[1]);
  const seconds = Number(date[2]);

  if (hours > 12) {
    hours -= 12;
  }

  return (
    <time className={cn(className, "clock-time")} dateTime={time}>
      <span
        className="clock-time__hand clock-time__hand--hour"
        style={{ transform: `rotate(${360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds}deg)` }}
      />
      <span
        className="clock-time__hand clock-time__hand--minute"
        style={{ transform: `rotate(${360 / 60 * minutes + 6 / 60 * seconds}deg)` }}
      />
      <span
        className="clock-time__hand clock-time__hand--second"
        style={{ transform: `rotate(${360 / 60 * seconds}deg)` }}
      />
    </time>
  );
}

export default ClockTime;
