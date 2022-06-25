const CONT = document.querySelector('.container');

abstract class Cellular {

    /* ... Feature Chiamate ... */
    private _model: string;       // modello cellulare
    private _creditDoll: number;  // credito disponibile (dollari)
    private _creditCent: number;  // credito disponibile (centesimi)
    private _timeHrs: number = 0; // tempi di chiamata (ore)
    private _timeMin: number = 0; // tempi di chiamata (minuti)
    private _timeSec: number = 0; // tempi di chiamata (secondi)
    static timer: number;         // var timer chiamata
    static calls: number = 0;     // contatore n. chiamate effettuate
    
    constructor(model: string, creditDoll: number, creditCent: number, timeHrs: number, timeMin: number, timeSec: number) {
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
 
    abstract infoModel(): string;
    abstract infoCredit(): string;
       
    creditValue(value: number): void { this._creditDoll = this._creditDoll + value; }
    setCall(): void { this._creditDoll++; }
    startCall(): void { setInterval(this.setCall, 1000); }

/*     setCall(): void {
        // gli serve l'oggetto per inizializzare il timer
        // devo inserire tutti gli oggetti che avranno un timer
        
        // qui scala 0.20cent scatto alla risposta
        Nokia._timeSec++;
        console.log(Nokia);
        if(Nokia._timeSec >= 60) {
            // qui scala 0.20cent ogni 60sec
            Nokia._timeSec = 0;
            Nokia._timeMin++;
            if(Nokia._timeMin >= 60) {
                Nokia._timeMin = 0;
                Nokia._timeHrs++;
            }
        }
    }
    
    startCall(): void { Cellular.timer = setInterval(this.setCall, 1000); }

    stopCall(): void { 
        clearInterval(Cellular.timer);
        //clear di tutti i timer
        Nokia._timeHrs = 0;
        Nokia._timeMin = 0;
        Nokia._timeSec = 0;
    } */

/*     resetCalls(): number {} */

}

class Phone extends Cellular {

    constructor(model: string, creditDoll: number, creditCent: number, timeHrs: number, timeMin: number, timeSec: number) {
        super(model, creditDoll, creditCent, timeHrs, timeMin, timeSec);
    }
    
    infoModel(): string {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit(): string {
        return `Credito Residuo: $ ${this.creditDoll}.${this.creditCent} - Tempi di chiamata: ${this.timeHrs}h ${this.timeMin}min ${this.timeSec}sec`;
    }
}

class Smartphone extends Cellular {

    /* ... Feature Internet ... */
    private _dataGb: number;  // Data disponibile (GB)
    private _dataMb: number;  // Data disponibile (MB)
    private _spaceGb: number; // Spazio memoria utilizzato (GB)
    private _spaceMb: number; // Spazio memoria utilizzato (MB)

    constructor(model: string, creditDoll: number, creditCent: number, timeHrs: number, timeMin: number, timeSec: number, dataGb: number, dataMb: number, spaceGb: number, spaceMb: number) {
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
    
    infoModel(): string {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit(): string {
        return `Credito Residuo: $ ${this.creditDoll}.${this.creditCent} - Tempi di chiamata: ${this.timeHrs}h ${this.timeMin}min ${this.timeSec}sec`;
    }
    infoData(): string {
        return `Data Residuo: ${this.dataGb}GB ${this.dataMb}MB - Tempo di navigazione: ${this.spaceGb}GB ${this.spaceMb}MB`;
    }

/*     chargeData(): number {}
    startInternet(): number {} */
}

let Nokia = new Phone ('Nokia 3330', 20, 0, 0, 0, 0);
let Iphone = new Smartphone ('Iphone 4s', 100, 0, 0, 0, 0, 10, 0, 0, 0); 
let Samsung = new Smartphone ('Samsung A50', 25, 0, 0, 0, 0, 10, 0, 0, 0);

function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}

commitCharge();


