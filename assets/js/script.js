"use strict";
const CONT = document.querySelector('.container');
class Cellular {
    constructor(model, creditDoll, creditCent, timeHrs, timeMin, timeSec) {
        this._timeHrs = 0; // tempi di chiamata (ore)
        this._timeMin = 0; // tempi di chiamata (minuti)
        this._timeSec = 0; // tempi di chiamata (secondi)
        this.timer = false; // var timer chiamata
        this._model = model;
        this._creditDoll = creditDoll;
        this._creditCent = creditCent;
        this._timeHrs = timeHrs;
        this._timeMin = timeMin;
        this._timeSec = timeSec;
    }
    get model() { return this._model; }
    get creditDoll() { return this._creditDoll; }
    get creditCent() { return this._creditCent; }
    get timeHrs() { return this._timeHrs; }
    get timeMin() { return this._timeMin; }
    get timeSec() { return this._timeSec; }
    creditValue(value) { this._creditDoll = this._creditDoll + value; }
    setCall() {
        if (this.timer === true) {
            this._timeSec++;
            if (this._timeSec >= 60) {
                // qui scala 0.20cent ogni 60sec
                this._timeSec = 0;
                this._timeMin++;
                if (this._timeMin >= 60) {
                    this._timeMin = 0;
                    this._timeHrs++;
                }
            }
            console.log(this);
        }
    }
    startCall() {
        this.timer = true;
        // se si utilizza fat arrow function il this mantiene lo scope della classe padre
        // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall)
        setInterval(() => this.setCall(), 1000);
    }
}
Cellular.calls = 0; // contatore n. chiamate effettuate
class Phone extends Cellular {
    constructor(model, creditDoll, creditCent, timeHrs, timeMin, timeSec) {
        super(model, creditDoll, creditCent, timeHrs, timeMin, timeSec);
    }
    infoModel() {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit() {
        return `Credito Residuo: $ ${this.creditDoll}.${this.creditCent} - Tempi di chiamata: ${this.timeHrs}h ${this.timeMin}min ${this.timeSec}sec`;
    }
}
class Smartphone extends Cellular {
    constructor(model, creditDoll, creditCent, timeHrs, timeMin, timeSec, dataGb, dataMb, spaceGb, spaceMb) {
        super(model, creditDoll, creditCent, timeHrs, timeMin, timeSec);
        this._dataGb = dataGb;
        this._dataMb = dataMb;
        this._spaceGb = spaceGb;
        this._spaceMb = spaceMb;
    }
    get dataGb() { return this._dataGb; }
    get dataMb() { return this._dataMb; }
    get spaceGb() { return this._spaceGb; }
    get spaceMb() { return this._spaceMb; }
    infoModel() {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit() {
        return `Credito Residuo: $ ${this.creditDoll}.${this.creditCent} - Tempi di chiamata: ${this.timeHrs}h ${this.timeMin}min ${this.timeSec}sec`;
    }
    infoData() {
        return `Data Residuo: ${this.dataGb}GB ${this.dataMb}MB - Tempo di navigazione: ${this.spaceGb}GB ${this.spaceMb}MB`;
    }
}
let Nokia = new Phone('Nokia 3330', 20, 0, 0, 0, 0);
let Iphone = new Smartphone('Iphone 4s', 100, 0, 0, 0, 0, 10, 0, 0, 0);
let Samsung = new Smartphone('Samsung A50', 25, 0, 0, 0, 0, 10, 0, 0, 0);
function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}
commitCharge();
