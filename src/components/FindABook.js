import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { search } from '../services/openLibraryAPI';
import { addBook } from '../redux/bookSlice';
import { useSelector } from 'react-redux';
import { selectBooks } from '../redux/bookSlice';
import styles from './FindABook.module.scss';

export default function FindABook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const booksToRead = useSelector(selectBooks);
  const dispatch = useDispatch(); 

  const fetch = async (value) => {
    let list = await search(value);

    booksToRead.forEach( book => {
      list.forEach( item => {
        if( book.key === item.key ) {
          item.isAdded = true;
        }
      })
    })

    setBooks(list);
  }

  const onChangeTitle = debounce( async value => {
    if(value.length < 3) {
      setBooks([]);
      return null;
    }
    setLoading(true);
    try{
      fetch(value);
      setError('');
    } catch(err) {
      setBooks([]);
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, 500);

  const onClickBook = index => {
    if(books[index].isAdded)
      return;
      
    let newBooks = [...books];
    newBooks[index].isAdded = true;
    setBooks(newBooks)
    dispatch(addBook(books[index]));
  }

  return (
    <div>
      <h1>Find a Book</h1>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter a book's title"
        onChange={e => onChangeTitle(e.target.value)}
      />
      
      {loading &&
        <p>Loading...</p>
      }
      {error &&
        <p>{error}</p>
      }

      <ul>
        {!loading && books.map((book, index) => (
          <li
            key={index}
            onClick={() => onClickBook(index)}
            className={book.isAdded ? styles.added : null}
          >
            <span>{book.title}</span>
            <br/>
            <span>{book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}