import { useState } from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './LoginForm.module.css';
import sprite from '../../../images/sprite.svg';

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

const EyeOpen = () => {
  return (
    <>
      <svg className={styles.svg}>
        <use href={sprite + '#icon-eye'} />
      </svg>
    </>
  );
};

const EyeClose = () => {
  return (
    <>
      <svg className={styles.svg}>
        <use href={sprite + '#icon-eye-blocked'} />
      </svg>
    </>
  );
};

export const LogInForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setpasswordIcon] = useState(<EyeClose />);

  const togglPassword = () => {
    setPasswordShown(!passwordShown);
    setpasswordIcon(!passwordShown ? <EyeOpen /> : <EyeClose />);
  };

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <p className={styles.error}>{message}</p>}
      />
    );
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <Form autoComplete="off" className={styles.form}>
        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            // value={email}
            // onChange={handleChange}
          />
          <FormError name="email" />
        </div>

        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            // value={password}
            // onChange={handleChange}
          />

          <span className={styles.yey_icon} onClick={togglPassword}>
            {passwordIcon}
          </span>
          <FormError name="password" />
        </div>

        <button className={styles.btn} type="submit">
          Log In Now
        </button>
      </Form>
    </Formik>
  );
};
