import { useHistory } from 'react-router-dom';

function ToReadView({books}) {
  const history = useHistory();

  const goToFindABook = () => {
    history.push('/find')
  }

  return (
    <div>
      <h1>To Read List</h1>
      { books &&
        <span>There are books to be read!</span>
      }
      { !books &&
        <div>
          <p>Nothing was added to the list yet.</p>
          <p>Try finding some interesting books.</p>
          <button onClick={goToFindABook}>Find Books</button>
        </div>
      }
    </div>
  )
}

const BOOKS_FROM_MOCK_RESPONSE = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W'
  },
  {
    title: 'Prometheus Rising',
    author: 'D. F. Wink',
    key: '/works/OL24231100W'
  },
  {
    title: 'Prometheus Rising',
    author: 'D. Wink',
    key: '/works/OL20900300W'
  },
  {
    title: 'Prometheus, or the rise of moral evil: a satire',
    author: 'Unknown author',
    key: '/works/OL18368290M'
  }
]

function toReadRedux() {
  return(
    <ToReadView books={BOOKS_FROM_MOCK_RESPONSE} />
  )
}

export default ToReadView;