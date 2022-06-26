const CONT = document.querySelector('.container');

abstract class Cellular {

    /* ---- Propr. definite nel constructor (Dati Fissi) */
    protected _model: string;              // modello cellulare
    protected _credit: number = 0;         // credito totale disponibile
    protected _timeHrs: number = 0;        // tempi di chiamata corrente ore (intervallo)
    protected _timeMin: number = 0;        // tempi di chiamata corrente minuti (intervallo)
    protected _timeSec: number = 0;        // tempi di chiamata corrente secondi (intervallo)
    protected _callInit: boolean = false;  // inizializzatore timer chiamata
    protected _timer: number = 0;          // prop. da attribuire all'intervallo call
    protected _callsCount: number = 0;     // contatore n. chiamate effettuate
    
    constructor(model: string) {
        this._model = model;
    }

    // utilizzare i get solo per definire propr. fisse che avranno tutti gli oggetti creati
    get model() { return this._model; }

    infoModel(): string {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit(): string {
        return `Credito Residuo: $ ${this._credit.toFixed(2)}`;
    }
    infoCall(): string {
        return `Tempo di chiamata: ${this._timeHrs}h ${this._timeMin}min ${this._timeSec}sec`;
    }
    infoCalls(): string {
        return `Numero chiamate effettuate: ${this._callsCount}`
    }
       
    // Metodo per caricare saldo (dollari) disponibile (minimo 5$):
    chargeCredit(value: number): void { 
        if(value <= 4) {
            alert(`Devi ricaricare un minimo di 5$`);
        } else if (value >= 5) { 
            alert(`Hai caricato con successo ${value}$!`);
            this._credit = this._credit + value; 
        }
    }
    
    // Metodo per gestire logica intervallo chiamata:
    setCall(): void {
        // il timer incrementa, i soldi decrementano
        if (this._callInit === true) {
            this._timeSec++;
            if(this._timeSec >= 60) {  // (60) ***TEST AREA***
                this._credit -= 0.20;
                if(this._credit <= 0.20) {
                    // fermo chiamata, stampo la durata ed alert
                    this.stopCall();
                    this._callsCount -= 1;
                    alert(`${this.infoCall()} Credito esaurito. Effettuare una ricarica.`);
                }
            }
            console.log(this.infoCredit()); // qui stampero' a video
        }
    }

    // Metodo per inizializzare intervallo chiamata:
    startCall(): void { 
        // stop all'intervallo precedente
        this.stopCall(); 
        this._callInit = true;

        // la call parte solo se ci sono + di 0.40 (0.20 scatto 0.20 60sec call)
        if(this._credit >= 0.20) { 
            this._credit -= 0.20;  // scatto alla risposta
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval( () => this.setCall(), 1000 ) 
        } else if(this._credit <= 0.20) { 
            alert(`Credito esaurito. Effettuare una ricarica.`) 
        }
    }

    stopCall(): void {
        this._callsCount += 1;
        this._callInit = false;
        clearInterval(this._timer);
    }

    resetCalls(): void {
        this._callsCount = 0;
    }
}

class Phone extends Cellular {

    constructor(model: string) {
        super(model);
    }
}

class Smartphone extends Cellular {

    /* ---- Propr. non definite nel constructor (Dati Mutevoli) */
    protected _data: number = 0;              // Data disponibile (GB/MB)
    protected _internetInit: boolean = false; // inizializzatore timer internet
    protected _space: number = 0;             // prop. da attribuire all'intervallo internet
    protected _internetCount: number = 0;     // n. navigazioni internet
    constructor(model: string) {
        super(model);
    }
    
    infoData(): string {
        return `Data Residuo: ${this._data.toFixed(3).slice(0,1)}GB ${this._data.toFixed(3).slice(2,5)}MB`;
    }
    infoInternet(): string {
        return `Numero navigazioni effettuate: ${this._internetCount}`
    }

    // Metodo per caricare data (GB) disponibili:
    chargeData(value: number): void { 
        if(this._credit <= 4) {         // (4) ***TEST AREA***

            alert(`Hai bisogno di almeno 5$ per ricarica il tuo Data (5$ -> 500MB - 10$ -> 1GB)`);
        } else if (this._credit >= 5) { // (5) ***TEST AREA***

            // il valore dell'input equivale ai GB da agg.
            this._data += value;        
            // il credito che scalo e' il valore input*10

            this._credit -= value*10; // (10) ***TEST AREA***
            alert(`Hai caricato con successo ' ${value.toFixed(3).slice(0,1)}GB ${value.toFixed(3).slice(2,5)}MB!`);
        }
    }

    // Metodo per gestire logica intervallo internet:
    setInternet(): void {
        if (this._internetInit === true) {
            // se il data e' 1MB data esaurito, stop Internet e stampa
            if(this._data <= 0.001) {
                this.stopInternet();
                this._internetCount -= 1;
                alert(`${this.infoData()} Data esaurito. Effettuare una ricarica.`);
            } else if (this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001;          // consumo al sec 0.001 (1MB)
                console.log(this.infoData()); // qui stampero' a video
            }
        }
    }

    // Metodo per inizializzare intervallo internet:
    startInternet(): void {
        this.stopInternet();
        this._internetInit = true;
        this._space = setInterval( () => this.setInternet(), 1000 );
    }

    stopInternet(): void {
        this._internetCount += 1;
        this._internetInit = false;
        clearInterval(this._space);
    }

    resetInternet(): void {
        this._internetCount = 0;
    }
}

let Nokia = new Phone ('Nokia 3330');
let Iphone = new Smartphone ('Iphone 4s'); 
let Samsung = new Smartphone ('Samsung A50');

function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}

commitCharge();


