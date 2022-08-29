import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadNeighborsByBorders, selectNeigbors } from './details-slicer';

export const useNeighbors = (borders = []) => {
  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeigbors)

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorders(borders))
    }
  }, [borders, dispatch]);

  return neighbors
}