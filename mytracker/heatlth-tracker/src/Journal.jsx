import './Journal.css';

function Journal() {
  return (
    <div className="Journal">
      <header className="App-header">
      <img src="Health tra.png" id="logo"/>
      </header>
      <h1 class="page_title">Journal</h1>
      <div  id="tracker">
        <div class="entry">
            <h2>Placeholder</h2>
            <img class="intensity" alt="intensity"/>
            <span class="reason">Motif:</span>
            <span id="date">À: </span>
            <p>This is my issue</p>
            <a href="http://localhost:5173/Entry">
              <button class="edit">Modifier</button>
            </a>
        </div>
      </div>

      <a href="http://localhost:5173/Entry">
        <button class="add">+
        </button>
      </a>


      </div>
  );
}

export default Journal;
