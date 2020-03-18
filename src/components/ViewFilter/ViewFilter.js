import React from 'react';
import { connect } from 'react-redux';
import { VIEW_FILTERS } from '../../constants';
import { setViewFilter } from '../../redux/actions';
import styles from './ViewFilter.module.css';
import cx from 'classnames'

function ViewFilter({ setViewFilter, viewFilter }) {
  return (
    <>
      <div className={styles.viewFilter}>
        <button
          onClick={() => setViewFilter(VIEW_FILTERS.CHEAPEST)}
          className={cx(
            styles.filterBtn,
            styles.left,
            {[styles.active]: viewFilter === VIEW_FILTERS.CHEAPEST},
            {[styles.leftActive]: viewFilter === VIEW_FILTERS.CHEAPEST},
          )}
        >
          Самый дешевый
        </button>
        <button
          onClick={() => setViewFilter(VIEW_FILTERS.FASTEST)}
          className={cx(
            styles.filterBtn,
            styles.right,
            {[styles.active]: viewFilter === VIEW_FILTERS.FASTEST},
            {[styles.rightActive]: viewFilter === VIEW_FILTERS.FASTEST},
          )}
        >
          Самый быстрый
        </button>
      </div>
    </>
  )
};

export default connect(
  (store) => ({ viewFilter: store.viewFilter, dataState: store.dataState }),
  { setViewFilter },
)(ViewFilter);