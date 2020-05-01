import React from 'react';
import { dateFormat } from '../../utils/formatTime';
import addMinutes from 'date-fns/addMinutes';

import styles from './TicketInfoRow.module.css';

function wordend(number, text_forms){
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return text_forms[2];
  if (n1 > 1 && n1 < 5) return text_forms[1];
  if (n1 === 1) return text_forms[0];
  return text_forms[2];
}

function calculateDuration(m) {
  const hours = Math.floor(m / 60);
  const minutes = m % 60;
  return [hours, minutes];
};

export function TicketInfoRow({ segment }) {
  const {
    origin,
    destination,
    date,
    stops,
    duration,
  } = segment;
  const fdate = new Date(date);
  const ddate = new Date(fdate);
  const [hours, minutes] = calculateDuration(duration);
  const durationDate = new Date(2020, 0, 1, hours, minutes);
  const destinationDate = addMinutes(ddate, duration);
  const forms = ['пересадка', 'пересадки', 'пересадок'];
  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <p className={styles.desc}>{origin} - {destination}</p>
        <p className={styles.info}>{dateFormat(fdate, ':')} - {dateFormat(destinationDate, ':')}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>В пути</p>
        <p className={styles.info}>{dateFormat(durationDate)}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>{stops.length} {wordend(stops.length, forms)}</p>
        <p className={styles.info}>{stops.join(', ')}</p>
      </div>
    </div>
  )
};