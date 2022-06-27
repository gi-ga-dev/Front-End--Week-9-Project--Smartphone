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
    let array: HTMLDivElement[] = [DIV_PHONE_1, DIV_PHONE_2, DIV_PHONE_3]; 
        
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

            let btnResetCalls = document.createElement('button') as HTMLButtonElement;
            btnResetCalls.id = 'btnResetCalls';
            btnResetCalls.innerHTML = 'Reset N. Chiamate';

            divSelect.append(divDisplay, inpRicCredit, btnRicCredit, btnStartCall, btnStopCall, btnResetCalls);

            // per ogni elemento nell'array assegno eventi 

            if(ele == array[0]) { // comparazione con se stesso
                btnRicCredit.addEventListener('click', () => { 
                    Nokia.chargeCredit(+inpRicCredit.value); 
                });
                btnStartCall.addEventListener('click', () => {
                    Nokia.startCall();     
                });
                btnStopCall.addEventListener('click', () => {
                    Nokia.stopCall();     
                });
                btnResetCalls.addEventListener('click', () => {
                    Nokia.resetCalls();     
                });
            }

            if (ele == array[1]) {
                btnRicCredit.addEventListener('click', () => {
                    Iphone.chargeCredit(+inpRicCredit.value);
                });
                btnStartCall.addEventListener('click', () => {
                    Iphone.startCall();     
                });
                btnStopCall.addEventListener('click', () => {
                    Iphone.stopCall();     
                });
                btnResetCalls.addEventListener('click', () => {
                    Iphone.resetCalls();     
                });
            }

            if (ele == array[2]) {
                btnRicCredit.addEventListener('click', () => {
                    Samsung.chargeCredit(+inpRicCredit.value);
                });
                btnStartCall.addEventListener('click', () => {
                    Samsung.startCall();     
                });
                btnStopCall.addEventListener('click', () => {
                    Samsung.stopCall();     
                });
                btnResetCalls.addEventListener('click', () => {
                    Samsung.resetCalls();     
                });
            }
        });   

        /* ----------------------------------------------- */

        divInternet.addEventListener('click', () => {

            divSelect.innerHTML = '';
            divCall.style.display = 'none';
            divInternet.style.display = 'none';

            let divBrowser = document.createElement('div') as HTMLDivElement;
            divBrowser.id = 'divBrowser';
            divBrowser.style.display = 'none';

            let imgBrowser = document.createElement('img') as HTMLImageElement;
            imgBrowser.id = 'imgBrowser';
            imgBrowser.src = '../assets/img/google-img.png';
            imgBrowser.style.width = '89%';
            divBrowser.append(imgBrowser);

            let divDisplay = document.createElement('div') as HTMLDivElement;
            divDisplay.id = 'divDisplay';

            let inpRicCredit = document.createElement('input') as HTMLInputElement;
            inpRicCredit.id = 'inpRicCredit';
            inpRicCredit.type = 'number';
            inpRicCredit.placeholder = 'Inserisci importo da ricaricare...';
            
            let btnRicCredit = document.createElement('button') as HTMLButtonElement;
            btnRicCredit.id = 'btnRicCredit';
            btnRicCredit.innerHTML = 'Ricarica Importo';

            let inpRicData = document.createElement('input') as HTMLInputElement;
            inpRicData.id = 'inpRicData';
            inpRicData.type = 'number';
            inpRicData.placeholder = 'Inserisci data da ricaricare...';
            
            let btnRicData = document.createElement('button') as HTMLButtonElement;
            btnRicData.id = 'btnRicData';
            btnRicData.innerHTML = 'Ricarica Data';

            let btnStartInt = document.createElement('button') as HTMLButtonElement;
            btnStartInt.id = 'btnStartInt';
            btnStartInt.innerHTML = 'Start Navigazione';

            let btnStopInt = document.createElement('button') as HTMLButtonElement;
            btnStopInt.id = 'btnStopInt';
            btnStopInt.innerHTML = 'Stop Navigazione';
            btnStopInt.style.display = 'none';

            let btnResetInt = document.createElement('button') as HTMLButtonElement;
            btnResetInt.id = 'btnResetInt';
            btnResetInt.innerHTML = 'Reset N. Navigazioni';

            divSelect.append(divBrowser, divDisplay, inpRicCredit, btnRicCredit, inpRicData, btnRicData, btnStartInt, btnStopInt, btnResetInt);

            /* ----------------------------------------------- */

            if (ele == array[1]) {
                btnRicCredit.addEventListener('click', () => {
                    Iphone.chargeCredit(+inpRicCredit.value);
                });
                btnRicData.addEventListener('click', () => { 
                    Iphone.chargeData(+inpRicData.value); 
                });
                btnStartInt.addEventListener('click', () => {
                    Iphone.startInternet();     
                });
                btnStopInt.addEventListener('click', () => {
                    Iphone.stopInternet();     
                });
                btnResetInt.addEventListener('click', () => {
                    Iphone.resetInternet();     
                });
            }

            if (ele == array[2]) {
                btnRicCredit.addEventListener('click', () => {
                    Samsung.chargeCredit(+inpRicCredit.value);
                });
                btnRicData.addEventListener('click', () => { 
                    Samsung.chargeData(+inpRicData.value); 
                });
                btnStartInt.addEventListener('click', () => {
                    Samsung.startInternet();     
                });
                btnStopInt.addEventListener('click', () => {
                    Samsung.stopInternet();     
                });
                btnResetInt.addEventListener('click', () => {
                    Samsung.resetInternet();     
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
        return `N. chiamate effettuate: ${this._callsCount}`;
    }
       
    // Metodo per caricare saldo (dollari) disponibile (minimo 5$):
    chargeCredit(value: number): void { 
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        let inpRicCredit = document.querySelector('#inpRicCredit') as HTMLInputElement;

        if(value <= 4) {
            divDisplay.innerHTML = `${Print.RIC_MIN_CREDIT} <br> ${this.infoCredit()}`;
            inpRicCredit.value = '';

        } else if (value >= 5) { 
            this._credit = this._credit + value; 
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} ${this.infoCredit()}`;
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

            if(this._timeSec >= 59) { // (59) ***TEST AREA***
                this._timeSec = -1;   // fa 59, 0, 1..
                this._timeMin++;
                this._credit -= 0.20;
                if(this._timeMin >=59) {
                    this._timeMin = -1;
                    this._timeHrs++;
                }
                if(this._credit <= 0.20) {
                    this.stopCall();
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
        this.showBtnStop();

        // la call parte solo se ci sono + di 0.20
        if(this._credit >= 0.20) { 
            this._credit -= 0.40;  // scatto alla risposta (0.40)
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval( () => this.setCall(), 1000 ) 
            this._callsCount++;
        } else if(this._credit <= 0.20) { 
            this.stopCall();
            divDisplay.innerHTML = `${Print.NO_CREDIT}`;
        }
    }

    stopCall(): void {
        this.showBtnStart();
        this._callInit = false;
        clearInterval(this._timer);
        this._timeHrs = 0;
        this._timeMin = 0;
        this._timeSec = 0;
    }
    
    resetCalls(): void {
        this._callsCount = 0;
    }

    showBtnStart(): void {
        let btnStartCall = document.querySelector('#btnStartCall') as HTMLButtonElement;
        let btnStopCall = document.querySelector('#btnStopCall') as HTMLButtonElement;
        btnStopCall.style.display = 'none';
        btnStartCall.style.display = 'initial';
    }
    showBtnStop(): void {
        let btnStartCall = document.querySelector('#btnStartCall') as HTMLButtonElement;
        let btnStopCall = document.querySelector('#btnStopCall') as HTMLButtonElement;
        btnStopCall.style.display = 'initial';
        btnStartCall.style.display = 'none';
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
        return `<br> N. navigazioni: ${this._internetCount}`
    }

    // Metodo per caricare data (GB) disponibili:
    chargeData(value: number): void { 
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        let inpRicData = document.querySelector('#inpRicData') as HTMLInputElement;

        if(this._credit <= 4) {     
            divDisplay.innerHTML = `${this.infoCredit()} <br> ${Print.RIC_MIN_DATA}`;
        }       
        if(value >= this._credit/9.5) { // operazione fallita
            divDisplay.innerHTML = `Operazione fallita <br> ${Print.RIC_MIN_DATA}<br>${this.infoCredit()}`;
            inpRicData.value = '';
        } else if(value <= this._credit/9.5) {
            this._data += value;        // operazione con successo    
            this._credit -= value*10; 
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} <br>Data disponibile: ${value.toFixed(3).slice(0,1)}GB ${value.toFixed(3).slice(2,5)}MB!`;
            inpRicData.value = '';
        }
    }

    // Metodo per gestire logica intervallo internet:
    setInternet(): void {
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        let divBrowser = document.querySelector('#divBrowser') as HTMLDivElement;
        if (this._internetInit === true) {
            // se il data e' inferiore a 1MB, stop Internet 
            if(this._data <= 0.001) {
                this.stopInternet();
                divDisplay.innerHTML = `${Print.NO_DATA} <br> ${this.infoData()}`;
            } else if (this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001;          // consumo al sec 0.001 (1MB)
                divDisplay.innerHTML = `${this.infoData()} ${this.infoInternet()}`; // qui stampero' a video
                divDisplay.style.paddingTop = '15px';
                divDisplay.style.paddingBottom = '15px';
                divBrowser.style.display = 'initial';
            }
        }
    }

    // Metodo per inizializzare intervallo internet:
    startInternet(): void {
        let divDisplay = document.querySelector('#divDisplay') as HTMLDivElement;
        divDisplay.innerHTML = `Navigazione Iniziata...`;

        this.stopInternet();
        this._internetInit = true;
        this.showBtnStop2();
        this._internetCount++;
        this._space = setInterval( () => this.setInternet(), 1000 );
    }

    stopInternet(): void {
        let divBrowser = document.querySelector('#divBrowser') as HTMLDivElement;
        divBrowser.style.display = 'none';
        this.showBtnStart2();
        this._internetInit = false;
        clearInterval(this._space);
    }

    resetInternet(): void {
        this._internetCount = 0;
    }

    showBtnStart2(): void {
        let btnStartInt = document.querySelector('#btnStartInt') as HTMLButtonElement;
        let btnStopInt = document.querySelector('#btnStopInt') as HTMLButtonElement;
        btnStopInt.style.display = 'none';
        btnStartInt.style.display = 'initial';
    }
    showBtnStop2(): void {
        let btnStartInt = document.querySelector('#btnStartInt') as HTMLButtonElement;
        let btnStopInt = document.querySelector('#btnStopInt') as HTMLButtonElement;
        btnStopInt.style.display = 'initial';
        btnStartInt.style.display = 'none';
    }
}

let Nokia = new Phone ('Nokia 3330');
let Iphone = new Smartphone ('Iphone 4s'); 
let Samsung = new Smartphone ('Samsung A50');

enum Print {
    RIC_MIN_CREDIT = `Ricarica minima di 5$`,
    RIC_MIN_DATA = `Ricarica min 500MB per Navigare <br>Digita 0.5 per 500MB (Costo 5$) <br> Digita 1 per 1GB (Costo 10$)`,
    RIC_SUCCESS = 'Ricarica avvenuta con successo!',
    NO_CREDIT = 'Credito esaurito. <br> Effettuare una ricarica.',
    NO_DATA = 'Data esaurito. <br> Effettuare una ricarica.'
}




