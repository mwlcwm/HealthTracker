import './App.css';

function App() {
  return (
    <div className="App">
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
            <button class="edit">Modifier</button>
        </div>
      </div>

      <button class="add">+</button>

      </div>
  );
}

export default App;
