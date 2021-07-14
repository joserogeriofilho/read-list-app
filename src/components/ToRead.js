import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBooks } from '../redux/bookSlice';


export function ToReadView({books}) {
  const history = useHistory();

  const goToFindABook = () => {
    history.push('/find')
  }

  return (
    <div className={'page'}>
      <h1>To Read List</h1>
      <ul>
        { (books && books.length > 0) && books.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              <br/>
              <span>{item.author}</span>
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

function ToReadRedux() {
  const books = useSelector(selectBooks);

  return(
    <ToReadView books={books} />
  )
}

export default ToReadRedux;