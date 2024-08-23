// import { IoPersonOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import css from './Contact.module.css';

export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.contactContainer}>
      <ul>
        <li className={css.contactWraper}>
          <IoPersonOutline />
          {name}
        </li>
        <li className={css.contactWraper}>
          <IoPhonePortraitOutline />
          {number}
        </li>
      </ul>
      <button className={css.contactBtn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
