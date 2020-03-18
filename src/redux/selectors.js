import { createSelector } from 'reselect'
import { VIEW_FILTERS, STOPS_FILTERS } from '../constants'

const getViewFilter = state => state.viewFilter;
const getStopsFilter = state => state.stopsFilter;
const getTickets = state => state.tickets;


const getStopsFromSegments = (segments) => {
  const [from, to] = segments;
  return [from.stops.length, to.stops.length];
}

export const getTicketsByViewFilter = createSelector(
  [ getViewFilter, getTickets],
  (viewFilter, tickets) => {
    switch (viewFilter) {
      case VIEW_FILTERS.CHEAPEST:
        return tickets.slice().sort((t1, t2) => t1.price - t2.price);
      case VIEW_FILTERS.FASTEST:
        return tickets.slice().sort((t1, t2) => {
          const t1Duration = t1.segments.reduce((acc, { duration }) => acc + duration, 0);
          const t2Duration = t2.segments.reduce((acc, { duration }) => acc + duration, 0);
          return t1Duration - t2Duration;
        });
      default:
        return tickets;
    }
  }
);

export const getTicketByStopsFilter = createSelector(
  [ getStopsFilter, getTickets ],
  (stopFilter, tickets) => {
    return tickets.filter(({ segments }) => {
      const [from, to] = getStopsFromSegments(segments);
      if (stopFilter.length === 0) return tickets;
      const relevant = stopFilter.map(e => e !== STOPS_FILTERS.ALL ? Number(e) : e);
      return relevant.includes(from) && relevant.includes(to);
    });
  }
);

export const getTicketByStopsAndViewFilter = createSelector(
  [getViewFilter, getTicketByStopsFilter],
  (viewFilter, tickets) => {
    switch (viewFilter) {
      case VIEW_FILTERS.CHEAPEST:
        return tickets.slice().sort((t1, t2) => t1.price - t2.price);
      case VIEW_FILTERS.FASTEST:
        return tickets.slice().sort((t1, t2) => {
          const t1Duration = t1.segments.reduce((acc, { duration }) => acc + duration, 0);
          const t2Duration = t2.segments.reduce((acc, { duration }) => acc + duration, 0);
          return t1Duration - t2Duration;
        });
      default:
        return tickets;
    }
  }
)
