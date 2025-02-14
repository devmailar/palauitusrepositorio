import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate, useParams } from 'react-router-dom';
import { useField } from './hooks/useField';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link
        to="/"
        style={padding}
      >
        anecdotes
      </Link>
      <Link
        to="/create"
        style={padding}
      >
        create new
      </Link>
      <Link
        to="/about"
        style={padding}
      >
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => {
        return (
          <li key={anecdote.id}>
            <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous, anecdotes
      differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more
      general than the brief tale itself, such as to characterize a person by delineating a specific quirk or trait, to
      communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. An
      anecdote is "a story with a point."
    </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    props.setNotification(`a new anecdote ${content.value} created!`);
    setTimeout(() => {
      props.setNotification('');
    }, 5000);

    navigate('/');
  };

  const handleReset = (e) => {
    e.preventDefault();

    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  // const anecdoteById = (id) => {
  //   return anecdotes.find((a) => a.id === id);
  // };

  const Anecdote = ({ anecdotes }) => {
    const id = useParams().id;
    const anecdote = anecdotes.find((n) => {
      return n.id === Number(id);
    });

    return (
      <article>
        <h2>{anecdote.content}</h2>
        <div>has {anecdote.votes} votes</div>
        <div>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
      </article>
    );
  };

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(
  //     anecdotes.map((a) => {
  //       return a.id === id ? voted : a;
  //     })
  //   );
  // };

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification !== '' && <dialog open>{notification}</dialog>}

        <Routes>
          <Route
            path="/"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route
            path="/create"
            element={
              <CreateNew
                addNew={addNew}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
