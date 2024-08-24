import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(
      /^(\+?\d{1,4}|\(\d{1,4}\))?\s?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Invalid phone number format. Supported formats are: +1234567890, (123) 456-7890, 123-456-7890.',
    )
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm({ onAdd }) {
  const userNameId = useId();
  const userNumber = useId();

  const handleSubmit = (values, actions) => {
    onAdd(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.formWrap}>
          <label htmlFor={userNameId}>Name</label>
          <Field
            type="text"
            className={css.formInput}
            name="name"
            id={userNameId}
          />
          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>

        <div className={css.formWrap}>
          <label htmlFor={userNumber}>Number</label>
          <Field
            type="tel"
            className={css.formInput}
            name="number"
            id={userNumber}
          />
          <ErrorMessage
            className={css.formError}
            name="number"
            component="span"
          />
        </div>

        <button type="submit" className={css.formBtn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
