"use strict";
const CONT = document.querySelector('.container');
class Cellular {
    constructor(model) {
        this._credit = 0; // credito totale disponibile
        this._timeHrs = 0; // tempi di chiamata corrente ore (intervallo)
        this._timeMin = 0; // tempi di chiamata corrente minuti (intervallo)
        this._timeSec = 0; // tempi di chiamata corrente secondi (intervallo)
        this._callInit = false; // inizializzatore timer chiamata
        this._timer = 0; // 
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
    // Metodo per caricare saldo (dollari) disponibile:
    creditValue(value) { this._credit = this._credit + value; }
    // Metodo per gestire logica intervallo chiamata:
    setCall() {
        // il timer incrementa, i soldi decrementano
        if (this._callInit === true) {
            this._timeSec++;
            if (this._timeSec >= 1) {
                this._credit -= 0.20;
                if (this._credit <= 0) {
                    // fermo chiamata, stampo la durata ed alert
                    this.stopCall();
                    alert(this.infoCall() + 'Credito esaurito. Effettuare una ricarica.');
                }
            }
            console.log(this.infoCredit());
        }
    }
    // Metodo per inizializzare intervallo chiamata:
    startCall() {
        this.stopCall();
        this._callInit = true;
        // se si utilizza fat arrow function il this mantiene lo scope della classe padre
        // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
        if (this._credit >= 0.20) {
            this._credit -= 0.20; // scatto alla risposta
            this._timer = setInterval(() => this.setCall(), 1000); // la call parte solo se ci sono + di 0.20
        }
        else if (this._credit === 0) {
            alert('Credito esaurito. Effettuare una ricarica.');
        }
    }
    stopCall() {
        this._callInit = false;
        clearInterval(this._timer);
        this.infoCall();
    }
}
Cellular.calls = 0; // contatore n. chiamate effettuate
class Phone extends Cellular {
    constructor(model) {
        super(model);
    }
}
class Smartphone extends Cellular {
    constructor(model, dataGb, dataMb) {
        super(model);
        /* ---- Propr. definite nel constructor (Dati Fissi) */
        this._dataGb = 0; // Data disponibile (GB)
        this._dataMb = 0; // Data disponibile (MB)
        /* ---- Propr. non definite nel constructor (Dati Mutevoli) */
        this._spaceGb = 0; // Spazio memoria in utilizzo GB (intervallo)
        this._spaceMb = 0; // Spazio memoria in utilizzo MB (intervallo)
        this._internetInit = false; // inizializzatore timer internet
        this._dataGb = dataGb;
        this._dataMb = dataMb;
    }
    get dataGb() { return this._dataGb; }
    get dataMb() { return this._dataMb; }
    infoData() {
        return `Data Residuo: ${this.dataGb}GB ${this.dataMb}MB - Tempo di navigazione: ${this._spaceGb}GB ${this._spaceMb}MB`;
    }
    // Metodo per caricare data (GB) disponibili:
    chargeData(value) { this._dataGb = this._dataGb + value; }
    // Metodo per gestire logica intervallo internet:
    setInternet() {
        if (this._internetInit === true) {
            this._spaceMb++;
            if (this._spaceMb >= 1000) {
                this._spaceMb = 0;
                this._spaceGb++;
            }
            console.log(this);
        }
    }
    // Metodo per inizializzare intervallo internet:
    startInternet() {
        this._internetInit = true;
        setInterval(() => this.setInternet(), 1000);
    }
}
let Nokia = new Phone('Nokia 3330');
let Iphone = new Smartphone('Iphone 4s', 100, 0);
let Samsung = new Smartphone('Samsung A50', 25, 0);
function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}
commitCharge();
