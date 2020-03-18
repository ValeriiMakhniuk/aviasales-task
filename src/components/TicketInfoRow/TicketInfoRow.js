import React from 'react';
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

function formatTime(h, m, separator) {
  if (h < 10) {
    if (m < 10) {
      if (separator !== ':') return `0${h}ч 0${m}м`;
      return `0${h}:0${m}`;
    }
    if (separator !== ':') return `0${h}ч ${m}м`;
    return `0${h}:${m}`;
  }
  if (m < 10) {
    if (separator !== ':') return `${h}ч 0${m}м`;
    return `${h}:0${m}`;
  }
  if (separator !== ':') return `${h}ч ${m}м`;
  return `${h}:${m}`;
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
  ddate.setUTCMinutes(fdate.getUTCMinutes() + duration);
  const flighStart = formatTime(fdate.getUTCHours(), fdate.getUTCMinutes(), ':');
  const flightEnd = formatTime(ddate.getUTCHours(), ddate.getUTCMinutes(), ':');
  const [hours, minutes] = calculateDuration(duration);
  const forms = ['пересадка', 'пересадки', 'пересадок'];
  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <p className={styles.desc}>{origin} - {destination}</p>
        <p className={styles.info}>{flighStart} - {flightEnd}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>В пути</p>
        <p className={styles.info}>{formatTime(hours, minutes)}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>{stops.length} {wordend(stops.length, forms)}</p>
        <p className={styles.info}>{stops.join(', ')}</p>
      </div>
    </div>
  )
};