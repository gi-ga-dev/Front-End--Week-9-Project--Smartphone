const CONT = document.querySelector('.container');

/* document.addEventListener('DOMContentLoaded', () => {
    // al caricamento della pagina creo gli elementi dinamicamente

    // =============== Div Lav. Autonomo =============== 

    let autDiv = document.createElement('div');
    autDiv.className = 'autDiv';

    let lordoAut = document.createElement('p');
    lordoAut.id = 'lordoAut';
    lordoAut.innerHTML = ` - Scheda Lavoratore Autonomo - <br> Reddito Lordo: ${lavAut1.reddLordo} Euro`;

    let inpsAut = document.createElement('p');
    inpsAut.id = 'inpsAut';
    inpsAut.innerHTML = `Tasse INPS: ${lavAut1.tasseInps}%`;

    let irpefAut = document.createElement('p');
    irpefAut.id = 'irpefAut';
    irpefAut.innerHTML = `Tasse Irpef: ${lavAut1.tasseIrpef}%  <hr>`;

    let nettoAut = document.createElement('p');
    nettoAut.id = 'nettoAut';
    nettoAut.innerHTML = `Reddito Netto: ${lavAut1.calcNet()} Euro`;

    // =============== Div Lav. Dipendente =============== 

    let dipDiv = document.createElement('div');
    dipDiv.className = 'dipDiv';

    let lordoDip = document.createElement('p');
    lordoDip.id = 'lordoDip';
    lordoDip.innerHTML = ` - Scheda Lavoratore Dipendente - <br> Reddito Lordo: ${lavDip1.reddLordo} Euro`;

    let inpsDip = document.createElement('p');
    inpsDip.id = 'inpsDip';
    inpsDip.innerHTML = `Tasse INPS: ${lavDip1.tasseInps}%`;

    let irpefDip = document.createElement('p');
    irpefDip.id = 'irpefDip';
    irpefDip.innerHTML = `Tasse Irpef: ${lavDip1.tasseIrpef}%  <hr>`;

    let nettoDip = document.createElement('p');
    nettoDip.id = 'nettoDip';
    nettoDip.innerHTML = `Reddito Netto: ${lavDip1.calcNet()} Euro`;

    // ----------------------------------------

    CONT?.append(autDiv, dipDiv);
    autDiv?.append(lordoAut, inpsAut, irpefAut, nettoAut);
    dipDiv?.append(lordoDip, inpsDip, irpefDip, nettoDip);

}); */

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

 /*    set timeHrs() { this.timeHrs = this._timeHrs; }
    set timeMin() { this.timeMin = this._timeMin; }
    set timeSec() { this.timeSec = this._timeSec; } */

    // metodo set prendi un dato e lo modifichi in base ad un condizione
    // se mi serve di invocare un cambiamento (es intervallo) ho bisogno di un metodo
 
    abstract infoModel(): string;
    abstract infoCredit(): string;
       
    creditValue(value: number): void { this._creditDoll = this._creditDoll + value; }
    
    setCall(): void {
        // qui scala 0.20cent scatto alla risposta
        this._timeSec++;
        if(this._timeSec >= 60) {
            // qui scala 0.20cent ogni 60sec
            this._timeSec = 0;
            this._timeMin++;
            if(this._timeMin >= 60) {
                this._timeMin = 0;
                this._timeHrs++;
            }
        }
        console.log((this._timeHrs > 9 ? this._timeHrs : '0'+this._timeHrs) + ':' 
        + (this._timeMin > 9 ? this._timeMin : '0'+this._timeMin) + ':' 
        + (this._timeSec > 9 ? this._timeSec : '0'+this._timeSec));
    }

    startCall(): void { Cellular.timer = setInterval(this.setCall, 1000); }
    
    stopCall(): void { 
        clearInterval(Cellular.timer);
        this._timeHrs = 0;
        this._timeMin = 0;
        this._timeSec = 0;
        console.log((this._timeHrs > 9 ? this._timeHrs : '0'+this._timeHrs) + ':' 
        + (this._timeMin > 9 ? this._timeMin : '0'+this._timeMin) + ':' 
        + (this._timeSec > 9 ? this._timeSec : '0'+this._timeSec));
    }

/*     resetCalls(): number {} */

    // Chiamate:
    // OK 1) metodo info per sapere il credito disponibile
    // OK 2) metodo per ricare il credito
    // 3) metodo con intervallo per far partire la chiamata
    // (scala 0.20 al richiamo della funzione (scatto alla risposta))
    // e successivamente quando i secondi trascorsi sono 60 altri 0.20
    // 4) metodo static che incrementa contatore (calls) al partire dell'intervallo chiamata
    // 5) metodo per azzerare contatore n. chiamate

}

class Phone extends Cellular {
    // Unica feature Chiamate (ereditata)

    constructor(model: string, creditDoll: number, creditCent: number, timeHrs: number, timeMin: number, timeSec: number) {
        super(model, creditDoll, creditCent, timeHrs, timeMin, timeSec);
    }

    // i metodi get sono gia' ereditati
    
    infoModel(): string {
        return `Modello Cellulare: ${this.model}`;
    }
    infoCredit(): string {
        return `Credito Residuo: $ ${this.creditDoll}.${this.creditCent} - Tempi di chiamata: ${this.timeHrs}h ${this.timeMin}min ${this.timeSec}sec`;
    }

/*     startCall(): number {}
    resetCalls(): number {} */

}

class Smartphone extends Cellular {

    // aggiungo feature esclusiva Internet

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

    // i metodi get delle chiamate sono gia' ereditati

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


/*     startCall(): number {}
    resetCalls(): number {} */

    // Metodi esclusivi

    // 1) metodo per ricaricare il data
    // 2) metodo con intervallo che fa partire il consumo di data (mb) 


/*     chargeData(): number {}
    startInternet(): number {} */
}

let Nokia = new Phone ('Nokia 3330', 20, 0, 0, 0, 0);
let Iphone = new Smartphone ('Iphone 4s', 100, 0, 0, 0, 0, 10, 0, 0, 0); 
let Samsung = new Smartphone ('Samsung A50', 25, 0, 0, 0, 0, 10, 0, 0, 0);

/* function creditCharge() { // carica il credito
    this.creditDoll = Nokia.creditValue();  // vado ad inizializz. l'operazione
} */

function commitCharge() {
    if (CONT !== null) {
        Nokia.creditValue(80);
        Nokia.startCall();
    }
}

commitCharge();

console.log(Nokia);
