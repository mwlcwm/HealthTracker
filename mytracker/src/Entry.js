import './Entry.css';

function Entry() {
  return (
    <div className="Entry">
      <header className="App-header">
      <img src="Health tra.png" id="logo"/>
      </header>
    
    <div class="ill">

        <form>

        <span id='ligne1'>    

            <label class="category">Titre de l'entrée
                <input type="text"></input>
            </label>
                

            <label class="category date" >Date
                <input type="date" ></input>
            </label>

        </span>

        <span id='ligne2'>

            <label class="category">Motif</label>

                <label> 
                <input type="radio" name="maladie" value="douleur"></input>
                Douleur
                </label>

                <label> 
                <input type="radio" name="maladie" value="nausee"></input>
                Nausée
                </label>

                <label> 
                <input type="radio" name="maladie" value="sneeze"></input>
                Éternuements
                </label>

                <label> 
                <input type="radio" name="maladie" value="toux"></input>
                Toux
                </label>

                <label> 
                <input type="radio" name="maladie" value="sang"></input>
                Saignement
                </label>

                <label> 
                <input type="radio" name="maladie" value="fracture"></input>
                Fracture
                </label>

                <label> 
                <input type="radio" name="maladie" value="entorse"></input>
                Entorse
                </label>

                <label> 
                <input type="radio" name="maladie" value="burn"></input>
                Brûlure
                </label>

                <label> 
                <input type="radio" name="maladie" value="infect"></input>
                Infection
                </label>

                <label> 
                <input type="radio" name="maladie" value="lesion"></input>
                Lésion
                </label>


                <label> 
                <input type="radio" name="maladie" value="cut"></input>
                Coupure
                </label>
                
        </span>

        <span id='ligne3'>

            <label class="category">Intensité</label>
            
            <input type="radio" id="intensity4" name="intensity" value="4" class="intensity-radio"></input>
        <label for="intensity4">
            <div class="color-box red"></div>
        </label>

        <input type="radio" id="intensity3" name="intensity" value="3"  class="intensity-radio"></input>
        <label for="intensity3">
            <div class="color-box orange"></div>
        </label>

        <input type="radio" id="intensity2" name="intensity" value="2" class="intensity-radio"></input>
        <label for="intensity2">
            <div class="color-box yellow"></div>
        </label>

        <input type="radio" id="intensity1" name="intensity" value="1" class="intensity-radio"></input>
        <label for="intensity1">
            <div class="color-box green"></div>
        </label>

        </span>

        <span id='ligne4'>
            
            <label class="category">Apportez des précisions 
                <input type='textarea'></input>
            </label>
            


        </span>

        <span id='ligne5'>
        <input type='submit' class="send"></input>
        </span>

        </form>

    </div>

    </div>
  );
}

export default Entry;
