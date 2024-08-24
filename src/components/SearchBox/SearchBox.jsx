import { useId } from 'react';
import css from './SearchBox.module.css';

export default function SearchBox({ value, onSearch }) {
  const searchId = useId();
  return (
    <div className={css.box}>
      <label htmlFor={searchId}>Find contacts by name</label>
      <input
        type="text"
        className={css.boxInput}
        id={searchId}
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
