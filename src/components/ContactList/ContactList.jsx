import PropTypes from 'prop-types';
import s from "./ContactList.module.css";

export default function ContactList({ contacts, onDeleteContact }) {
    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => (
            <li key={id} className={s.item}>
                    <p className={s.text}>
                        {name}: {number} </p>
                <span className={s.span}></span>
                <button type="button"
                    onClick={() => onDeleteContact(id)}
                    className={s.button}
                >Delete</button>
            </li>
        ))}</ul>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
