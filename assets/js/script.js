"use strict";
const CONT = document.querySelector('.container');
class Cellular {
    constructor(model) {
        this._credit = 0; // credito totale disponibile
        this._timeHrs = 0; // tempi di chiamata corrente ore (intervallo)
        this._timeMin = 0; // tempi di chiamata corrente minuti (intervallo)
        this._timeSec = 0; // tempi di chiamata corrente secondi (intervallo)
        this._callInit = false; // inizializzatore timer chiamata
        this._timer = 0; // prop. da attribuire all'intervallo call
        this._callsCount = 0; // contatore n. chiamate effettuate
        this._model = model;
    }
    // utilizzare i get solo per definire propr. fisse che avranno tutti gli oggetti creati
    get model() { return this._model; }
    infoModel() {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit() {
        return `Credito Residuo: $ ${this._credit.toFixed(2)}`;
    }
    infoCall() {
        return `Tempo di chiamata: ${this._timeHrs}h ${this._timeMin}min ${this._timeSec}sec`;
    }
    infoCalls() {
        return `Numero chiamate effettuate: ${this._callsCount}`;
    }
    // Metodo per caricare saldo (dollari) disponibile (minimo 5$):
    chargeCredit(value) {
        if (value <= 4) {
            alert('Devi ricaricare un minimo di 5$');
        }
        else if (value >= 5) {
            alert('Hai caricato con successo ' + value + '$!');
            this._credit = this._credit + value;
        }
    }
    // Metodo per gestire logica intervallo chiamata:
    setCall() {
        // il timer incrementa, i soldi decrementano
        if (this._callInit === true) {
            this._timeSec++;
            if (this._timeSec >= 60) { // ***TEST AREA***
                this._credit -= 0.20;
                if (this._credit <= 0.20) {
                    // fermo chiamata, stampo la durata ed alert
                    this.stopCall();
                    alert(this.infoCall() + ' Credito esaurito. Effettuare una ricarica.');
                }
            }
            console.log(this.infoCredit()); // qui stampero' a video
        }
    }
    // Metodo per inizializzare intervallo chiamata:
    startCall() {
        // stop all'intervallo precedente
        this.stopCall();
        this._callInit = true;
        // la call parte solo se ci sono + di 0.40 (0.20 scatto 0.20 60sec call)
        if (this._credit >= 0.20) {
            this._credit -= 0.20; // scatto alla risposta
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval(() => this.setCall(), 1000);
        }
        else if (this._credit <= 0.20) {
            this._callsCount += 0.5;
            alert('Credito esaurito. Effettuare una ricarica.');
        }
    }
    stopCall() {
        // incremento il contatore chiamate (0.5 perche' stopCall viene chiamata 2 volte)
        this._callsCount += 0.5;
        this._callInit = false;
        clearInterval(this._timer);
    }
    resetCalls() {
        this._callsCount = 0;
    }
}
class Phone extends Cellular {
    constructor(model) {
        super(model);
    }
}
class Smartphone extends Cellular {
    constructor(model) {
        super(model);
        /* ---- Propr. non definite nel constructor (Dati Mutevoli) */
        this._data = 0; // Data disponibile (GB/MB)
        this._internetInit = false; // inizializzatore timer internet
        this._space = 0; // prop. da attribuire all'intervallo internet
        this._internetCount = 0; // n. navigazioni internet
    }
    infoData() {
        return `Data Residuo: ${this._data.toFixed(3).slice(0, 1)}GB ${this._data.toFixed(3).slice(2, 5)}MB`;
    }
    infoInternet() {
        return `Numero navigazioni effettuate: ${this._internetCount}`;
    }
    // Metodo per caricare data (GB) disponibili:
    chargeData(value) {
        if (this._credit <= 9) { // ***TEST AREA***
            alert('Hai bisogno di almeno 10$ per ricarica i tuoi GB (10$ -> 1GB)');
        }
        else if (this._credit >= 10) { // ***TEST AREA***
            // il valore dell'input equivale ai GB da agg.
            this._data += value;
            // il credito che scalo e' il valore input*10
            this._credit -= value * 10; // ***TEST AREA***
            alert('Hai caricato con successo ' + value + 'GB!');
        }
    }
    // Metodo per gestire logica intervallo internet:
    setInternet() {
        if (this._internetInit === true) {
            // se il data e' 1MB data esaurito, stop Internet e stampa
            if (this._data <= 0.001) {
                this.stopInternet();
                alert(this.infoData() + ' Data esaurito. Effettuare una ricarica.');
            }
            else if (this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001; // consumo al sec 0.001 (1MB)
                console.log(this.infoData()); // qui stampero' a video
            }
        }
    }
    // Metodo per inizializzare intervallo internet:
    startInternet() {
        this.stopInternet();
        this._internetInit = true;
        this._space = setInterval(() => this.setInternet(), 1000);
    }
    stopInternet() {
        this._internetCount += 0.5;
        this._internetInit = false;
        clearInterval(this._space);
    }
    resetInternet() {
        this._internetCount = 0;
    }
}
let Nokia = new Phone('Nokia 3330');
let Iphone = new Smartphone('Iphone 4s');
let Samsung = new Smartphone('Samsung A50');
function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}
commitCharge();
