import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/common/Container';
import TrainingBookList from '../../components/TrainingBookList/TrainingBookList';
import s from './TrainingPage.module.css';
import { addBookToTraining } from '../../redux/training/trainingOperatons';
import { getBooks } from '../../redux/training/trainingSelectors';

const TrainingPage = () => {
  const dispatch = useDispatch();

  // const books = useSelector(getBooks);

  const books = [
    {
      name: 'Lord of the rings',
      author: 'Tolkien',
      year: 2006,
      page: 200,
    },
    {
      name: 'Harry Potter',
      author: 'Roaling',
      year: 2008,
      page: 300,
    },
  ];

  const [book, setBook] = useState('');

  const isThereThisBook = name => {
    return books?.some(book => book.name.toLowerCase() === name.toLowerCase());
  };

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    if (book) {
      setBook(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const { value } = e.currentTarget;
    if (isThereThisBook(book)) {
      alert(`${book} already exist`);
      return;
    } else {
      setBook({ ...book, value });
    }

    // dispatch(addBookToTraining({ book }));

    setBook('');
  };

  return (
    <Container>
      <div className={s.trainingPage}>
        <div className={s.trainingContainer}>
          <h2 className={s.trainingTitle}>Моє тренування</h2>
          <form className={s.trainingChooseBook} onSubmit={onSubmit}>
            <input
              type="text"
              name="book"
              list="books"
              placeholder="Обрати книги з бібліотеки"
              className={s.trainingInput}
              onChange={handleInputChange}
            />
            <datalist id="books">
              {books.map(book => (
                <option value={book.name} />
              ))}
            </datalist>
            <button
              type="submit"
              className={s.trainingBtn}
              // onClick={addBookToTraining}
            >
              Додати
            </button>
          </form>
          <TrainingBookList books={books} />
        </div>
        <div className={s.trainingGoal}>
          <h2 className={s.trainingTitle}>Моя мета прочитати</h2>
        </div>
      </div>
    </Container>
  );
};

export default TrainingPage;
