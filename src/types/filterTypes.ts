export type FilterTypes = 'Active' | 'Completed';

export interface FilterProps {
  setFilter: (arg: FilterTypes) => void;
  filter: FilterTypes;
}
