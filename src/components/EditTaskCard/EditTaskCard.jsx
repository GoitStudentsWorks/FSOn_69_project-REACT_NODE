import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import styles from './EditTaskCard.module.css';
import sprite from '../../images/sprite.svg';
import { useDispatch } from 'react-redux';
import { updateTask } from 'redux/boards/operations';

// додавання календаря
import CustomMonthLayout from 'components/Calendar/Calendar';
import { format } from 'date-fns';
// const today = new Date();

// const initialValues = {
//   title: '',
//   description: '',
//   priority: '',
// };

const registerSchema = object({
  title: string().required(),
  priority: string().required(),
  description: string().required(),
});

export const EditTaskCard = ({ task }) => {
  const { id, title, description, priority, deadline } = task;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDaySelected, setNewDaySelected] = useState(deadline);
  //

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'title':
        return setNewTitle(value);
      case 'description':
        return setNewDescription(value);
      case 'priority':
        return setNewPriority(value);
      default:
        return;
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(
      updateTask({
        id,
        data: {
          title: newTitle,
          description: newDescription,
          priority: newPriority,
          deadline: format(newDaySelected, 'dd/MM/yyyy'),
        },
      })
    );
    setNewTitle('');
    setNewDescription('');
    setNewPriority('');
    setSubmitting(false);
    toggleModal();
  };

  const radioOptions = [
    { color: '#8fa1d0', priority: 'low' },
    { color: '#e09cb5', priority: 'medium' },
    { color: '#bedbb0', priority: 'high' },
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'without' },
  ];

  return (
    <div>
      <button className={styles.cardButton} onClick={toggleModal}>
        <svg
          width={16}
          height={16}
          aria-label="icon-pencil"
          className={styles.svg}
        >
          <title>Edit card</title>
          <use href={sprite + '#icon-pencil'} />
        </svg>
      </button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            // initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form autoComplete="off">
                <p className={styles.title}>Edit card</p>
                <Field
                  className={styles.input}
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newTitle}
                  onChange={e => handleChange(e, setFieldValue)}
                />

                <Field
                  as="textarea"
                  className={styles.textarea}
                  name="description"
                  placeholder="Description"
                  value={newDescription}
                  onChange={e => handleChange(e, setFieldValue)}
                />
                <div className="wrap">
                  <span className={styles.label}>Label color</span>
                  <div className={styles.priorityIcons}>
                    {radioOptions.map((option, index) => (
                      <label key={index} className={styles.radioLabel}>
                        <Field
                          type="radio"
                          name="priority"
                          value={`${option.priority}`}
                          className={styles.radioInput}
                          onChange={e => handleChange(e, setFieldValue)}
                        />
                        <span
                          className={styles.radioButton}
                          style={{ backgroundColor: option.color }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>

                <CustomMonthLayout
                  daySelected={newDaySelected}
                  setDaySelected={setNewDaySelected}
                />

                <button
                  className={styles.btn}
                  type="submit"
                  onClick={() => {
                    setFieldValue('title', newTitle);
                    setFieldValue('description', newDescription);
                  }}
                >
                  <svg className={styles.btnIcon}>
                    <use href={sprite + '#icon-plus'}></use>
                  </svg>
                  <span>Edit</span>
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};
