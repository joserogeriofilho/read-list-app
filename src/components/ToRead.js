import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBooks, markAsRead } from '../redux/bookSlice';
import { useDispatch } from 'react-redux';


export default function ToRead() {
  const history = useHistory();
  const books = useSelector(selectBooks);
  const dispatch = useDispatch(); 

  const handleBookClick = event => {
    const index = event.target.name;
    dispatch(markAsRead(books[index].key));
  }

  const goToFindABook = () => {
    history.push('/find')
  }

  return (
    <div className={'page'}>
      <h1>To Read List</h1>
      <ul>
        { (books && books.length > 0) && books.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`book-${index}`}
                data-testid={`book-${index}`}
                name={`${index}`}
                checked={item.read ? true : false}
                onChange={handleBookClick}
              />
                <label htmlFor={`book-${index}`}>
                <span>{item.title}</span>
                <br/>
                <span>{item.author}</span>
              </label>
            </li>
          ))
        }
      </ul>
      { (!books || books.length === 0) &&
        <div>
          <p>Nothing was added to the list yet.</p>
          <p>Try finding some interesting books.</p>
          <button onClick={goToFindABook}>Find Books</button>
        </div>
      }
    </div>
  )
}