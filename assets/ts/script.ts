const CONT = document.querySelector('.container');

abstract class Cellular {

    /* ---- Propr. definite nel constructor (Dati Fissi) */
    protected _model: string;              // modello cellulare
    protected _credit: number = 0;         // credito totale disponibile
    protected _timeHrs: number = 0;        // tempi di chiamata corrente ore (intervallo)
    protected _timeMin: number = 0;        // tempi di chiamata corrente minuti (intervallo)
    protected _timeSec: number = 0;        // tempi di chiamata corrente secondi (intervallo)
    protected _callInit: boolean = false;  // inizializzatore timer chiamata
    protected _timer: number = 0;          // 
    static calls: number = 0;              // contatore n. chiamate effettuate
    
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
       
    // Metodo per caricare saldo (dollari) disponibile:
    creditValue(value: number): void { this._credit = this._credit + value; }
    
    // Metodo per gestire logica intervallo chiamata:
    setCall(): void {
        // il timer incrementa, i soldi decrementano
        if (this._callInit === true) {
            this._timeSec++;
            if(this._timeSec >= 1) {
                // se callInit true sec salgono
                // se i sec sono sup./= 1 credito -0.20
                // se credito 0 stop chiamata, stampa durata e alert

                this._credit -= 0.20;
                if(this._credit === 0) {

                    // fermo chiamata, stampo la durata ed alert
                    this.stopCall();
                    console.log(this.infoCall());
                    alert('Credito Esaurito');
                }
            }
            console.log(this.infoCredit());
        }
    }

    // Metodo per inizializzare intervallo chiamata:
    startCall(): void { 
        this.stopCall();
        this._callInit = true;
        this._credit -= 0.20;  // scatto alla risposta

        // se si utilizza fat arrow function il this mantiene lo scope della classe padre
        // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall)
        this._timer = setInterval( () => this.setCall(), 1000 ) 
    }

    stopCall(): void {
        this._callInit = false;
        clearInterval(this._timer)
    }


/*     resetCalls(): number {} */

}

class Phone extends Cellular {

    constructor(model: string) {
        super(model);
    }
}

class Smartphone extends Cellular {

    /* ---- Propr. definite nel constructor (Dati Fissi) */
    protected _dataGb: number = 0;  // Data disponibile (GB)
    protected _dataMb: number = 0;  // Data disponibile (MB)

    /* ---- Propr. non definite nel constructor (Dati Mutevoli) */
    protected _spaceGb: number = 0;           // Spazio memoria in utilizzo GB (intervallo)
    protected _spaceMb: number = 0;           // Spazio memoria in utilizzo MB (intervallo)
    protected _internetInit: boolean = false; // inizializzatore timer internet

    constructor(model: string, dataGb: number, dataMb: number) {
        super(model);
        this._dataGb = dataGb;
        this._dataMb = dataMb;
    }

    get dataGb() { return this._dataGb; }
    get dataMb() { return this._dataMb; }
    
    infoData(): string {
        return `Data Residuo: ${this.dataGb}GB ${this.dataMb}MB - Tempo di navigazione: ${this._spaceGb}GB ${this._spaceMb}MB`;
    }

    // Metodo per caricare data (GB) disponibili:
    chargeData(value: number): void { this._dataGb = this._dataGb + value; }

    // Metodo per gestire logica intervallo internet:
    setInternet(): void {
        if (this._internetInit === true) {

            this._spaceMb++;
            if(this._spaceMb >= 1000) {
                this._spaceMb = 0;
                this._spaceGb++;
            }
            console.log(this);
        }
    }

    // Metodo per inizializzare intervallo internet:
    startInternet(): void {
        this._internetInit = true;
        setInterval( () => this.setInternet(), 1000 )
    }
}

let Nokia = new Phone ('Nokia 3330');
let Iphone = new Smartphone ('Iphone 4s', 100, 0); 
let Samsung = new Smartphone ('Samsung A50', 25, 0);

function commitCharge() {
    if (CONT !== null) {
        /* Nokia.creditValue(100); */
        /* Nokia.startCall(); */
    }
}

commitCharge();


