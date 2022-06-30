const CONT = document.querySelector('.container') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {

    let arrPhones: Smartphone[] = [Iphone, Samsung];

    arrPhones.forEach(ele => { 

        const DIV_PHONE = document.createElement('div');
        DIV_PHONE.className = 'divPhone';

        let divCamera = document.createElement('div');
        divCamera.id = 'divCamera';
        divCamera.innerHTML = '( O )';

        let divStandby = document.createElement('div');
        divStandby.id = 'divStandby';
        divStandby.style.display = 'initial';

        let btnShow = document.createElement('button');
        btnShow.id = 'btnShow';
        btnShow.innerHTML = 'Sblocca Telefono';
        btnShow.addEventListener('click', function() {          
            divStandby.style.display = 'none';
            divSelect.style.display = 'initial';
        })

        let divSelect = document.createElement('div');   // schermata selezione
        divSelect.id = 'divSelect';
        divSelect.style.display = 'none';

        // ----------------------------------------------

        divSelect.innerHTML = '';

        let divDisplay = document.createElement('div') as HTMLDivElement;
        divDisplay.id = 'divDisplay';

        let inpRicCredit = document.createElement('input') as HTMLInputElement;
        inpRicCredit.id = 'inpRicCredit';
        inpRicCredit.type = 'number';
        inpRicCredit.placeholder = 'Inserisci Credito/Data da ricaricare...'
        
        let btnRicCredit = document.createElement('button') as HTMLButtonElement;
        btnRicCredit.id = 'btnRicCredit';
        btnRicCredit.innerHTML = 'Ricarica Credito';
        btnRicCredit.addEventListener('click', () => { ele.chargeCredit(+inpRicCredit.value); });

        let btnStartCall = document.createElement('button') as HTMLButtonElement;
        btnStartCall.id = 'btnStartCall';
        btnStartCall.innerHTML = 'Start Chiamata';
        btnStartCall.addEventListener('click', () => { 
            ele.startCall(); 
            ele.stopInternet();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)';
        });

        let btnStopCall = document.createElement('button') as HTMLButtonElement;
        btnStopCall.id = 'btnStopCall';
        btnStopCall.innerHTML = 'Stop Chiamata';
        btnStopCall.style.display = 'none';
        btnStopCall.addEventListener('click', () => { ele.stopCall(); });

        let btnResetCalls = document.createElement('button') as HTMLButtonElement;
        btnResetCalls.id = 'btnResetCalls';
        btnResetCalls.innerHTML = 'Reset N. Chiamate';
        btnResetCalls.addEventListener('click', () => { ele.resetCalls(); });

        // ----------------------------------------------------------------------
            
        let btnRicData = document.createElement('button') as HTMLButtonElement;
        btnRicData.id = 'btnRicData';
        btnRicData.innerHTML = 'Ricarica Data';
        btnRicData.addEventListener('click', () => { ele.chargeData(+inpRicCredit.value); });

        let btnStartInt = document.createElement('button') as HTMLButtonElement;
        btnStartInt.id = 'btnStartInt';
        btnStartInt.innerHTML = 'Start Navigazione';
        btnStartInt.addEventListener('click', () => {
            ele.startInternet();
            ele.stopCall();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)';
        });

        let btnStopInt = document.createElement('button') as HTMLButtonElement;
        btnStopInt.id = 'btnStopInt';
        btnStopInt.innerHTML = 'Stop Navigazione';
        btnStopInt.style.display = 'none';
        btnStopInt.addEventListener('click', () => {
            ele.stopInternet();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)'; 
        });

        let btnResetInt = document.createElement('button') as HTMLButtonElement;
        btnResetInt.id = 'btnResetInt';
        btnResetInt.innerHTML = 'Reset N. Navigazioni';
        btnResetInt.addEventListener('click', () => { ele.resetInternet(); });       

        // ----------------------------------------------------------------------

        CONT?.append(DIV_PHONE);
        DIV_PHONE.append(divCamera, divStandby, divSelect);
        divStandby.append(btnShow);
        divSelect.append(divDisplay, inpRicCredit, btnRicCredit, btnRicData, btnStartCall, btnStopCall, btnStartInt, btnStopInt, btnResetCalls, btnResetInt);
    });
});

abstract class Cellular {

    protected _model: string;              // modello cellulare
    protected _credit: number = 0;         // credito totale disponibile
    protected _timeHrs: number = 0;        // tempi di chiamata corrente ore (intervallo)
    protected _timeMin: number = 0;        // tempi di chiamata corrente minuti (intervallo)
    protected _timeSec: number = 0;        // tempi di chiamata corrente secondi (intervallo)
    protected _timer: number = 0;          // prop. da attribuire all'intervallo call
    protected _callInit: boolean = false;  // inizializzatore timer chiamata
    protected _callsCount: number = 0;     // contatore n. chiamate effettuate
    protected _cellId: number;
    static _id: number = -1;

    constructor(model: string) {
        this._model = model;
        Cellular._id++;
        this._cellId = Cellular._id;
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
        // con QuerySelectorAll non puoi passare 1 solo nodo, ma con un contatore nella classe padre che incrementa per ogni oggetto, considerera' piu' nodi uguali
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        let inpRicCredit = document.querySelectorAll('#inpRicCredit')[this._cellId] as HTMLInputElement;
        if(value <= 4) {
            divDisplay.innerHTML = `${Print.RIC_MIN_CREDIT} <br> ${this.infoCredit()}`;
            inpRicCredit.value = '';

        } else if (value >= 5) { 
            this._credit = this._credit + value; 
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} <br>${this.infoCredit()}`;
            inpRicCredit.value = '';
        }
    }
    
    // Metodo per gestire logica intervallo chiamata:
    setCall(): void {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        if (this._callInit === true) {
            this._timeSec++;
            divDisplay.innerHTML = `${this.infoCall()} ${this.infoCredit()} <br> ${this.infoCalls()}`;
            divDisplay.style.background = 'url(../assets/img/call-img.png)';
            divDisplay.style.backgroundSize = '100%';
            divDisplay.style.backgroundRepeat = 'no-repeat';
            divDisplay.style.backgroundPosition = 'center';
            if(this._timeSec >= 59) {
                this._timeSec = -1;   // (59, 0, 1..)
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
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        divDisplay.innerHTML = `<br><br>Chiamata Iniziata...`;
        this.stopCall();  // stop all'intervallo precedente
        this._callInit = true;
        this.showBtnStop();
        if(this._credit >= 0.20) { 
            this._credit -= 0.40;  // scatto alla risposta (0.40)
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval( () => this.setCall(), 1000 ) 
            this._callsCount++;
        } else if(this._credit <= 0.20) {
            this.stopCall();
            divDisplay.innerHTML = `${Print.NO_CREDIT}${this.infoCredit()}`;
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

        let btnStopCall = document.querySelectorAll('#btnStopCall')[this._cellId] as HTMLButtonElement;
        let btnStartCall = document.querySelectorAll('#btnStartCall')[this._cellId] as HTMLButtonElement;
        btnStopCall.style.display = 'none';
        btnStartCall.style.display = 'initial';
    }
    showBtnStop(): void {
        let btnStopCall = document.querySelectorAll('#btnStopCall')[this._cellId] as HTMLButtonElement;
        let btnStartCall = document.querySelectorAll('#btnStartCall')[this._cellId] as HTMLButtonElement;
        btnStopCall.style.display = 'initial';
        btnStartCall.style.display = 'none'; 
    }
}

class Smartphone extends Cellular {

    protected _data: number = 0;              // Data disponibile (GB/MB)
    protected _space: number = 0;             // prop. da attribuire all'intervallo internet
    protected _internetInit: boolean = false; // inizializzatore timer internet
    protected _internetCount: number = 0;     // n. navigazioni internet
    protected _id: number = Cellular._id;

    constructor(model: string) {
        super(model);
    }
    
    infoData(): string {
        return `Data Residuo: ${this._data.toFixed(3).slice(0,1)}GB ${this._data.toFixed(3).slice(2,5)}MB`;
    }
    infoInternet(): string {
        return `<br> N. navigazioni: ${this._internetCount}`;
    }

    // Metodo per caricare data (GB) disponibili:
    chargeData(value: number): void { 
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        let inpRicCredit = document.querySelectorAll('#inpRicCredit')[this._cellId] as HTMLInputElement;
        if(value >= this._credit/9.5) { // operazione fallita
            divDisplay.innerHTML = `${Print.RIC_MIN_DATA}`;
            inpRicCredit.value = '';
        } else if(value <= this._credit/9.5) {
            this._data += value;        // operazione con successo    
            this._credit -= value*10; 
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} <br>Data disponibile: ${value.toFixed(3).slice(0,1)}GB ${value.toFixed(3).slice(2,5)}MB!`;
            inpRicCredit.value = '';
        }
        if(this._credit >= 0.20 && this._data <= 0.5) {
            divDisplay.innerHTML = `${Print.RIC_MIN_DATA}`;    
        }
    }

    // Metodo per gestire logica intervallo internet:
    setInternet(): void {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        if (this._internetInit === true) {
            // se il data e' inferiore a 1MB, stop Internet 
            if(this._data <= 0.001) {
                this.stopInternet();
                divDisplay.innerHTML = `${Print.NO_DATA} <br> ${this.infoData()}`;
            } else if(this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001;          // consumo al sec 0.001 (1MB)
                divDisplay.style.background = 'url(../assets/img/google-img.png)';
                divDisplay.style.backgroundSize = '100%';
                divDisplay.style.backgroundRepeat = 'no-repeat';
                divDisplay.innerHTML = `<br><br><br>${this.infoData()} ${this.infoInternet()}`; // qui stampero' a video
            } 
        }
    }

    // Metodo per inizializzare intervallo internet:
    startInternet(): void {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId] as HTMLDivElement;
        this.stopInternet();
        this._internetInit = true;
        this.showBtnStop2();
        this._internetCount++;
        divDisplay.innerHTML = `<br><br>Navigazione Iniziata...`;
        this._space = setInterval( () => this.setInternet(), 1000 );
    }

    stopInternet(): void {
        this.showBtnStart2();
        this._internetInit = false;
        clearInterval(this._space);
    }

    resetInternet(): void {
        this._internetCount = 0;
    }

    showBtnStart2(): void {
        let btnStartInt = document.querySelectorAll('#btnStartInt')[this._cellId] as HTMLButtonElement;
        let btnStopInt = document.querySelectorAll('#btnStopInt')[this._cellId] as HTMLButtonElement;
        btnStopInt.style.display = 'none';
        btnStartInt.style.display = 'initial';
    }
    showBtnStop2(): void {
        let btnStartInt = document.querySelectorAll('#btnStartInt')[this._cellId] as HTMLButtonElement;
        let btnStopInt = document.querySelectorAll('#btnStopInt')[this._cellId] as HTMLButtonElement;
        btnStopInt.style.display = 'initial';
        btnStartInt.style.display = 'none';
    }
}

let Iphone = new Smartphone ('Iphone'); 
let Samsung = new Smartphone ('Samsung');

enum Print {
    RIC_MIN_CREDIT = `Operazione Fallita..<br>Ricarica minima di 5$`,
    RIC_MIN_DATA = `Operazione Fallita..<br>Digita 0.5 per 500MB (Costo 5$) <br> Digita 1 per 1GB (Costo 10$)`,
    RIC_SUCCESS = 'Ricarica avvenuta con successo!',
    NO_CREDIT = 'Credito esaurito. <br> Effettuare una ricarica.',
    NO_DATA = 'Data esaurito. <br> Effettuare una ricarica.'
}