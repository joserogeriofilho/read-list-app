import { useSelector } from 'react-redux';
import { selectBooks } from '../redux/bookSlice';

export default function Finished() {
  const books = useSelector(selectBooks);
  const finishedBooks = books.filter(book => book.read);

  return (
    <div className={'page'}>
      <h1>Finished Books</h1>
      { finishedBooks.length > 0 && finishedBooks.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
            <br/>
            <span>{item.author}</span>
          </li>
        ))
      }
    </div>
  )
}