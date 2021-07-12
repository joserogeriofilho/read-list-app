import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { search } from '../services/openLibraryAPI';
import { addBook } from '../redux/bookSlice';

export default function FindABook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch(); 

  const onChangeTitle = debounce( async value => {
    if(value.length < 3) {
      setBooks([]);
      return null;
    }
    setLoading(true);
    try{
      let list = await search(value);
      setBooks(list);
      setError('');
    } catch(err) {
      setBooks([]);
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, 500);

  const onClickBook = book => {
    dispatch(addBook(book));
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
      <ul>
        {loading &&
          <span>Loading...</span>
        }
        {error &&
          <span>{error}</span>
        }
        {!loading && books.map((item, index) => (
          <li key={index} onClick={() => onClickBook(item)}>
            <span>{item.title}</span>
            <br/>
            <span>{item.author}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}