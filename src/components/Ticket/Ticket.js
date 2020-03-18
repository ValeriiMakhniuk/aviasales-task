import React from 'react';
import { TicketInfoRow } from '../TicketInfoRow/TicketInfoRow';
import styles from './Ticket.module.css';

function numberWithSpaces(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function Ticket({ price, carrier, segments }) {
  const [from, to] = segments;
  return (
    <div className={styles.ticket}>
      <div className={styles.topRow}>
        <p className={styles.price}>{numberWithSpaces(price)} Р</p>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt='carrier logo' className={styles.logo}/>
      </div>
      <TicketInfoRow segment={from}/>
      <TicketInfoRow segment={to}/>
    </div>
  );
};
