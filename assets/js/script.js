"use strict";
const CONT = document.querySelector('.container');
document.addEventListener('DOMContentLoaded', () => {
    let arrPhones = [Iphone, Samsung];
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
        btnShow.addEventListener('click', function () {
            divStandby.style.display = 'none';
            divSelect.style.display = 'initial';
        });
        let divSelect = document.createElement('div'); // schermata selezione
        divSelect.id = 'divSelect';
        divSelect.style.display = 'none';
        // ----------------------------------------------
        divSelect.innerHTML = '';
        let divDisplay = document.createElement('div');
        divDisplay.id = 'divDisplay';
        let inpRicCredit = document.createElement('input');
        inpRicCredit.id = 'inpRicCredit';
        inpRicCredit.type = 'number';
        inpRicCredit.placeholder = 'Inserisci Credito/Data da ricaricare...';
        let btnRicCredit = document.createElement('button');
        btnRicCredit.id = 'btnRicCredit';
        btnRicCredit.innerHTML = 'Ricarica Credito';
        btnRicCredit.addEventListener('click', () => { ele.chargeCredit(+inpRicCredit.value); });
        let btnStartCall = document.createElement('button');
        btnStartCall.id = 'btnStartCall';
        btnStartCall.innerHTML = 'Start Chiamata';
        btnStartCall.addEventListener('click', () => {
            ele.startCall();
            ele.stopInternet();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        let btnStopCall = document.createElement('button');
        btnStopCall.id = 'btnStopCall';
        btnStopCall.innerHTML = 'Stop Chiamata';
        btnStopCall.style.display = 'none';
        btnStopCall.addEventListener('click', () => { ele.stopCall(); });
        let btnResetCalls = document.createElement('button');
        btnResetCalls.id = 'btnResetCalls';
        btnResetCalls.innerHTML = 'Reset N. Chiamate';
        btnResetCalls.addEventListener('click', () => { ele.resetCalls(); });
        // ----------------------------------------------------------------------
        let btnRicData = document.createElement('button');
        btnRicData.id = 'btnRicData';
        btnRicData.innerHTML = 'Ricarica Data';
        btnRicData.addEventListener('click', () => { ele.chargeData(+inpRicCredit.value); });
        let btnStartInt = document.createElement('button');
        btnStartInt.id = 'btnStartInt';
        btnStartInt.innerHTML = 'Start Navigazione';
        btnStartInt.addEventListener('click', () => {
            ele.startInternet();
            ele.stopCall();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        let btnStopInt = document.createElement('button');
        btnStopInt.id = 'btnStopInt';
        btnStopInt.innerHTML = 'Stop Navigazione';
        btnStopInt.style.display = 'none';
        btnStopInt.addEventListener('click', () => {
            ele.stopInternet();
            divDisplay.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        let btnResetInt = document.createElement('button');
        btnResetInt.id = 'btnResetInt';
        btnResetInt.innerHTML = 'Reset N. Navigazioni';
        btnResetInt.addEventListener('click', () => { ele.resetInternet(); });
        // ----------------------------------------------------------------------
        CONT === null || CONT === void 0 ? void 0 : CONT.append(DIV_PHONE);
        DIV_PHONE.append(divCamera, divStandby, divSelect);
        divStandby.append(btnShow);
        divSelect.append(divDisplay, inpRicCredit, btnRicCredit, btnRicData, btnStartCall, btnStopCall, btnStartInt, btnStopInt, btnResetCalls, btnResetInt);
    });
});
class Cellular {
    constructor(model) {
        this._credit = 0; // credito totale disponibile
        this._timeHrs = 0; // tempi di chiamata corrente ore (intervallo)
        this._timeMin = 0; // tempi di chiamata corrente minuti (intervallo)
        this._timeSec = 0; // tempi di chiamata corrente secondi (intervallo)
        this._timer = 0; // prop. da attribuire all'intervallo call
        this._callInit = false; // inizializzatore timer chiamata
        this._callsCount = 0; // contatore n. chiamate effettuate
        this._model = model;
        Cellular._id++;
        this._cellId = Cellular._id;
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
        return `Tempo di chiamata: <br> ${this._timeHrs}h ${this._timeMin}min ${this._timeSec}sec ${'<br>'}`;
    }
    infoCalls() {
        return `N. chiamate effettuate: ${this._callsCount}`;
    }
    // Metodo per caricare saldo (dollari) disponibile (minimo 5$):
    chargeCredit(value) {
        // con QuerySelectorAll non puoi passare 1 solo nodo, ma con un contatore nella classe padre che incrementa per ogni oggetto, considerera' piu' nodi uguali
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        let inpRicCredit = document.querySelectorAll('#inpRicCredit')[this._cellId];
        if (value <= 4) {
            divDisplay.innerHTML = `${Print.RIC_MIN_CREDIT} <br> ${this.infoCredit()}`;
            inpRicCredit.value = '';
        }
        else if (value >= 5) {
            this._credit = this._credit + value;
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} <br>${this.infoCredit()}`;
            inpRicCredit.value = '';
        }
    }
    // Metodo per gestire logica intervallo chiamata:
    setCall() {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        if (this._callInit === true) {
            this._timeSec++;
            divDisplay.innerHTML = `${this.infoCall()} ${this.infoCredit()} <br> ${this.infoCalls()}`;
            divDisplay.style.background = 'url(../assets/img/call-img.png)';
            divDisplay.style.backgroundSize = '100%';
            divDisplay.style.backgroundRepeat = 'no-repeat';
            divDisplay.style.backgroundPosition = 'center';
            if (this._timeSec >= 59) {
                this._timeSec = -1; // (59, 0, 1..)
                this._timeMin++;
                this._credit -= 0.20;
                if (this._timeMin >= 59) {
                    this._timeMin = -1;
                    this._timeHrs++;
                }
                if (this._credit <= 0.20) {
                    this.stopCall();
                    divDisplay.innerHTML = `${Print.NO_CREDIT}`;
                }
            }
        }
    }
    // Metodo per inizializzare intervallo chiamata:
    startCall() {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        divDisplay.innerHTML = `<br><br>Chiamata Iniziata...`;
        this.stopCall(); // stop all'intervallo precedente
        this._callInit = true;
        this.showBtnStop();
        if (this._credit >= 0.20) {
            this._credit -= 0.40; // scatto alla risposta (0.40)
            // con fat arrow function il this mantiene lo scope della classe padre
            // senza si riferisce all'istanza che ha chiamato l'oggetto (startCall) 
            this._timer = setInterval(() => this.setCall(), 1000);
            this._callsCount++;
        }
        else if (this._credit <= 0.20) {
            this.stopCall();
            divDisplay.innerHTML = `${Print.NO_CREDIT}${this.infoCredit()}`;
        }
    }
    stopCall() {
        this.showBtnStart();
        this._callInit = false;
        clearInterval(this._timer);
        this._timeHrs = 0;
        this._timeMin = 0;
        this._timeSec = 0;
    }
    resetCalls() {
        this._callsCount = 0;
    }
    showBtnStart() {
        let btnStopCall = document.querySelectorAll('#btnStopCall')[this._cellId];
        let btnStartCall = document.querySelectorAll('#btnStartCall')[this._cellId];
        btnStopCall.style.display = 'none';
        btnStartCall.style.display = 'initial';
    }
    showBtnStop() {
        let btnStopCall = document.querySelectorAll('#btnStopCall')[this._cellId];
        let btnStartCall = document.querySelectorAll('#btnStartCall')[this._cellId];
        btnStopCall.style.display = 'initial';
        btnStartCall.style.display = 'none';
    }
}
Cellular._id = -1;
class Smartphone extends Cellular {
    constructor(model) {
        super(model);
        this._data = 0; // Data disponibile (GB/MB)
        this._space = 0; // prop. da attribuire all'intervallo internet
        this._internetInit = false; // inizializzatore timer internet
        this._internetCount = 0; // n. navigazioni internet
        this._id = Cellular._id;
    }
    infoData() {
        return `Data Residuo: ${this._data.toFixed(3).slice(0, 1)}GB ${this._data.toFixed(3).slice(2, 5)}MB`;
    }
    infoInternet() {
        return `<br> N. navigazioni: ${this._internetCount}`;
    }
    // Metodo per caricare data (GB) disponibili:
    chargeData(value) {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        let inpRicCredit = document.querySelectorAll('#inpRicCredit')[this._cellId];
        if (value >= this._credit / 9.5) { // operazione fallita
            divDisplay.innerHTML = `${Print.RIC_MIN_DATA}`;
            inpRicCredit.value = '';
        }
        else if (value <= this._credit / 9.5) {
            this._data += value; // operazione con successo    
            this._credit -= value * 10;
            divDisplay.innerHTML = `${Print.RIC_SUCCESS} <br>Data disponibile: ${value.toFixed(3).slice(0, 1)}GB ${value.toFixed(3).slice(2, 5)}MB!`;
            inpRicCredit.value = '';
        }
        if (this._credit >= 0.20 && this._data <= 0.5) {
            divDisplay.innerHTML = `${Print.RIC_MIN_DATA}`;
        }
    }
    // Metodo per gestire logica intervallo internet:
    setInternet() {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        if (this._internetInit === true) {
            // se il data e' inferiore a 1MB, stop Internet 
            if (this._data <= 0.001) {
                this.stopInternet();
                divDisplay.innerHTML = `${Print.NO_DATA} <br> ${this.infoData()}`;
            }
            else if (this._data >= 0.001) { // finche data e' >= 1MB scala il data
                this._data -= 0.001; // consumo al sec 0.001 (1MB)
                divDisplay.style.background = 'url(../assets/img/google-img.png)';
                divDisplay.style.backgroundSize = '100%';
                divDisplay.style.backgroundRepeat = 'no-repeat';
                divDisplay.innerHTML = `<br><br><br>${this.infoData()} ${this.infoInternet()}`; // qui stampero' a video
            }
        }
    }
    // Metodo per inizializzare intervallo internet:
    startInternet() {
        let divDisplay = document.querySelectorAll('#divDisplay')[this._cellId];
        this.stopInternet();
        this._internetInit = true;
        this.showBtnStop2();
        this._internetCount++;
        divDisplay.innerHTML = `<br><br>Navigazione Iniziata...`;
        this._space = setInterval(() => this.setInternet(), 1000);
    }
    stopInternet() {
        this.showBtnStart2();
        this._internetInit = false;
        clearInterval(this._space);
    }
    resetInternet() {
        this._internetCount = 0;
    }
    showBtnStart2() {
        let btnStartInt = document.querySelectorAll('#btnStartInt')[this._cellId];
        let btnStopInt = document.querySelectorAll('#btnStopInt')[this._cellId];
        btnStopInt.style.display = 'none';
        btnStartInt.style.display = 'initial';
    }
    showBtnStop2() {
        let btnStartInt = document.querySelectorAll('#btnStartInt')[this._cellId];
        let btnStopInt = document.querySelectorAll('#btnStopInt')[this._cellId];
        btnStopInt.style.display = 'initial';
        btnStartInt.style.display = 'none';
    }
}
let Iphone = new Smartphone('Iphone');
let Samsung = new Smartphone('Samsung');
var Print;
(function (Print) {
    Print["RIC_MIN_CREDIT"] = "Operazione Fallita..<br>Ricarica minima di 5$";
    Print["RIC_MIN_DATA"] = "Operazione Fallita..<br>Digita 0.5 per 500MB (Costo 5$) <br> Digita 1 per 1GB (Costo 10$)";
    Print["RIC_SUCCESS"] = "Ricarica avvenuta con successo!";
    Print["NO_CREDIT"] = "Credito esaurito. <br> Effettuare una ricarica.";
    Print["NO_DATA"] = "Data esaurito. <br> Effettuare una ricarica.";
})(Print || (Print = {}));
