// Div non dinamico (HTML) si puo' chiamare dai metodi di classe senza riscrivere il query selector
const CONT = document.querySelector('.container') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {

    /* ========= Div Cellular 1 ========= */

    const DIV_PHONE_1 = document.createElement('div');
    DIV_PHONE_1.className = 'divPhone1';

    const DIV_PHONE_2 = document.createElement('div');
    DIV_PHONE_2.className = 'divPhone2';

    const DIV_PHONE_3 = document.createElement('div');
    DIV_PHONE_3.className = 'divPhone3';

    /* ---------------------------------------- */

    CONT?.append(DIV_PHONE_1, DIV_PHONE_2, DIV_PHONE_3);

    // lo stesso div non puo' essere appeso 2 volte, c'e' bisogno di un foreach
    // per ogni elem. nell'array (per ogni telefono) crei gli elementi e li appendi
    let array: any[] = [DIV_PHONE_1, DIV_PHONE_2, DIV_PHONE_3]; 
        
    array.forEach(ele => { 

        let divSelect = document.createElement('div');
        divSelect.id = 'divSelect';
        divSelect.innerHTML = 'Seleziona Feature';

        let divCall = document.createElement('div');
        divCall.id = 'divCall';
        divCall.innerHTML = 'Call';

        let divInternet = document.createElement('div');
        divInternet.id = 'divInternet';
        divInternet.innerHTML = 'Internet';

        ele.append(divSelect);
        divSelect.append(divCall, divInternet);

        /* -------------------------- */

        /* let arrObject: Cellular[] = [Nokia, Iphone, Samsung]; */

        divCall.addEventListener('click', () => {

            divSelect.innerHTML = '';
            divCall.style.display = 'none';
            divInternet.style.display = 'none';

            let divDisplay = document.createElement('div') as HTMLDivElement;
            divDisplay.id = 'divDisplay';

            let inpRicCredit = document.createElement('input') as HTMLInputElement;
            inpRicCredit.id = 'inpRicCredit';
            inpRicCredit.type = 'number';
            inpRicCredit.placeholder = 'Inserisci importo da ricaricare...'
            
            let btnRicCredit = document.createElement('button') as HTMLButtonElement;
            btnRicCredit.id = 'btnRicCredit';
            btnRicCredit.innerHTML = 'Ricarica Importo';

            let btnStartCall = document.createElement('button') as HTMLButtonElement;
            btnStartCall.id = 'btnStartCall';
            btnStartCall.innerHTML = 'Start Chiamata';

            let btnStopCall = document.createElement('button') as HTMLButtonElement;
            btnStopCall.id = 'btnStopCall';
            btnStopCall.innerHTML = 'Stop Chiamata';
            btnStopCall.style.display = 'none';

            divSelect.append(divDisplay, inpRicCredit, btnRicCredit, btnStartCall, btnStopCall);

            // per ogni elemento nell'array assegno eventi 

            if(ele == array[0]) {
                btnRicCredit.addEventListener('click', () => { 
                    Nokia.chargeCredit(+inpRicCredit.value); 
                });
                btnStartCall.addEventListener('click', () => {
                    Nokia.startCall();     
                    btnStartCall.style.display = 'none';
                    btnStopCall.style.display = 'initial';
                });
                btnStopCall.addEventListener('click', () => {
                    Nokia.stopCall();     
                    btnStopCall.style.display = 'none';
                    btnStartCall.style.display = 'initial';
                });
            }

            if (ele == array[1]) {
                btnRicCredit.addEventListener('click', () => {
                    Iphone.chargeCredit(+inpRicCredit.value);
                });

                btnStartCall.addEventListener('click', () => {
                    Iphone.startCall();     
                    btnStartCall.style.display = 'none';
                    btnStopCall.style.display = 'initial';
                });
                btnStopCall.addEventListener('click', () => {
                    Iphone.stopCall();     
                    btnStopCall.style.display = 'none';
                    btnStartCall.style.display = 'initial';
                });
            }

            if (ele == array[2]) {
                btnRicCredit.addEventListener('click', () => {
                    Samsung.chargeCredit(+inpRicCredit.value);
                });
                btnStartCall.addEventListener('click', () => {
                    Samsung.startCall();     
                    btnStartCall.style.display = 'none';
                    btnStopCall.style.display = 'initial';
                });
                btnStopCall.addEventListener('click', () => {
                    Samsung.stopCall();     
                    btnStopCall.style.display = 'none';
                    btnStartCall.style.display = 'initial';
                });
            }
        });   
    });
});

abstract class Cellular {

    /* ---- Propr. definite nel constructor (Dati Fissi) */
    protected _model: string;              // modello cellulare
    protected _credit: number = 0;         // credito totale disponibile
    protected _timeHrs: number = 0;        // tempi di chiamata corrente ore (intervallo)
    protected _timeMin: number = 0;        // tempi di chiamata corrente minuti (intervallo)
    protected _timeSec: number = 0;        // tempi di chiamata corrente secondi (intervallo)
    protected _timer: number = 0;          // prop. da attribuire all'intervallo call
    protected _callInit: boolean = false;  // inizializzatore timer chiamata
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
        return `Tempo di chiamata: <br> ${this._timeHrs}h ${this._timeMin}min ${this._timeSec}sec ${'<br>'}`;
    }
    infoCalls(): string {
        return `N. chiamate effettuate: ${this._callsCount}`
    }
       
    // Metodo per caricare saldo (dollari) disponibile (minimo 5$):
    chargeCredit(value: number): void { 
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        let inpRicCredit = document.querySelector('#inpRicCredit') as HTMLInputElement;

        if(value <= 4) {
            divDisplay.innerHTML = `${Print.RIC_MIN_CREDIT}`;
            inpRicCredit.value = '';

        } else if (value >= 5) { 
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} ${value}$!`;
            this._credit = this._credit + value; 
            inpRicCredit.value = '';
        }
    }
    
    // Metodo per gestire logica intervallo chiamata:
    setCall(): void {
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        // il timer incrementa, i soldi decrementano
        if (this._callInit === true) {
            this._timeSec++;
            divDisplay.innerHTML = `${this.infoCall()} ${this.infoCredit()} <br> ${this.infoCalls()}`;

            if(this._timeSec >= 1) {  // (60) ***TEST AREA***
                this._credit -= 0.20;

                if(this._credit <= 0.20) {
                    // fermo chiamata, stampo la durata ed alert
                    this.stopCall();
                    this._callsCount -= 1;
                    divDisplay.innerHTML = `${Print.NO_CREDIT}`;
                }
            }
            
        } 
    }

    // Metodo per inizializzare intervallo chiamata:
    startCall(): void { 
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        divDisplay.innerHTML = `Chiamata Iniziata...`;

        this.stopCall();  // stop all'intervallo precedente
        this._callInit = true;

        // la call parte solo se ci sono + di 0.40 (0.20 scatto 0.20 60sec call)
        if(this._credit >= 0.20) { 
            this._credit -= 0.20;  // scatto alla risposta
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval( () => this.setCall(), 1000 ) 


        } else if(this._credit <= 0.20) { 
            // se dichiaro la const di un div dinamico fuori dalla classe il .innerHTML nella classe ritorna null     
            this.stopCall();
            divDisplay.innerHTML = `${Print.NO_CREDIT}`;
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
    protected _space: number = 0;             // prop. da attribuire all'intervallo internet
    protected _internetInit: boolean = false; // inizializzatore timer internet
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
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        if(this._credit <= 4) {         // (4) ***TEST AREA***
            divDisplay.innerHTML = `${Print.RIC_MIN_DATA}`;
        } else if (this._credit >= 5) { // (5) ***TEST AREA***
            // il valore dell'input equivale ai GB da agg.
            this._data += value;        
            // il credito che scalo e' il valore input*10
            this._credit -= value*10; // (10) ***TEST AREA***
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} ${value.toFixed(3).slice(0,1)}GB ${value.toFixed(3).slice(2,5)}MB!`;
        }
    }

    // Metodo per gestire logica intervallo internet:
    setInternet(): void {
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        if (this._internetInit === true) {
            // se il data e' 1MB data esaurito, stop Internet e stampa
            if(this._data <= 0.001) {
                /* alert(`Connessione in corso....`); */
                this.stopInternet();
                this._internetCount -= 1;
                divDisplay.innerHTML = `${this.infoData()} ${Print.NO_DATA}`;
            } else if (this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001;          // consumo al sec 0.001 (1MB)
                divDisplay.innerHTML = `${this.infoData()}`; // qui stampero' a video
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

enum Print {
    RIC_MIN_CREDIT = `Devi ricaricare un minimo di 5$`,
    RIC_MIN_DATA = `Minimo 5$ per ricaricare Data <br> (5$ -> 500MB - 10$ -> 1GB)`,
    RIC_SUCCESS = 'Hai caricato con successo ',
    NO_CREDIT = 'Credito esaurito. <br> Effettuare una ricarica.',
    NO_DATA = 'Data esaurito. <br> Effettuare una ricarica.'
}




