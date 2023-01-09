import { LitElement, html, css } from 'lit';
import './c4-board';
import './c4-player-selector';
import './c4-message';
import './c4-turn';


import {refreshIcon} from '@dile/icons';

import {Game} from '../models/Game.js';
import { gameCSS } from './css/game-css';
import { Message } from '../views/Message';



export class C4Game extends LitElement {
    static styles = [
         gameCSS
        
    ];

    #game ; // propiedad privada juego con el que vamos a trabajar manipular
    #started;
    #waitForUserInput;


     // definimos propiedad REACTIVA 
     static get properties() {
        return {
            started: { type: Boolean }, // NUMERO PROP DEL COMPO

        };
    }

    constructor() {
        // si exitende de clases padre en Js llamar a super
        super(); //llamada a constructor clase padre .

        //instancia nuevo juego
        this.#game = new Game(); // clase que implementa modelo del juego
        this.#started=false;  // no hace falta por que si no existe es null y null es false.
        this.#waitForUserInput= false;


    }

    firstUpdated() { // ciclo de vida de lit ... 
        // cuando se ha actualizado el componente la primera vez .. 
        // hago esto ...
        Message.TITLE.write();

    }
   

    render() {
        return html`
            <section>
                <header>
                    <h1> Conect <span>4</span></h1>
                    <c4-button .icon=${refreshIcon} white
                    @click=${this.doReset}> Reset</c4-button>
                    <c4-turn
                        id="theturn"
                        .game=${this.#game} 
                        @machine-player-column= ${this.doMachineColumnSelected}
                        @wait-for-user-input = ${this.doWaitForUserInput}
                    ></c4-turn>

                </header>
                <main>
                  <!-- recibo evento  perssonalizado de c4-players-selector
                    si esta inicializado el juego ?? muestro o no ...
                -->  
                <c4-player-selector
                    class="${this.started ? 'hidden' : ''}"
                    @set-players=${this.doSetPlayers}
                  
                    ></c4-player-selector>

                    <c4-board
                    id="theboard"
                    .game=${this.#game} 
                    class="${this.started ? '' : 'hidden'}"
                    @column-selected=${this.doUserColumnSelected}

                    ></c4-board>
                </main>
            </section>
            <footer>
                <c4-message></c4-message>
            </footer>
        `;
    }


    get board() {
        return this.shadowRoot.getElementById('theboard');

    }

    get turn() {
        return this.shadowRoot.getElementById('theturn');

    }

    doSetPlayers(e){ //recibe objeto evento 
        console.log('numero de players',e.detail.numPlayers);
       

        this.#game.reset(e.detail.numPlayers);
        this.board.updateBoard(); // me da el tablero .. pero no esta en el dom esta en el shadowRoot
        // sobre el tablero construye tablero..
        this.started=true;

        // todo sobre casillas y con el turno( pasa de un jugador a otro .)....


        this.turn.dropToken(); // turno coloca una pieza...



    }
    doReset() {
        this.started = false;
    }

    doMachineColumnSelected(e) {

        this.updateBoard(e.detail.player);
       /*  console.log('-doMachineColumnSelected->', e.detail.index  );
       // this.#game.getActivePlayer().dropToken(e.detail.index);// paso columna..
       //e.detail.player.dropToken(e.detail.index);
       // linea anterior quitada porue lo paso ..
       // lo dejo en turno e.detail.player.dropToken(e.detail.index);

       //droptoken le dice que ponga ficha en columna que me dice ....

        // ahora pedimos a tablero que se construya ..
        this.board.updateBoard();

        // preguntamos si el juego esta terminado .. 
        if(this.#game.isFinished()){
            // si ha terminado .. muestra el ganador..necesitamos saber quien es el ganador...
           // 2 - 1,50
            let messageText = Message.PLAYER_WIN.toString();
            messageText = messageText.replace(`#color`, e.detail.player.getColor().toString()); 
            (new Message(messageText)).write();



        }else {
            this.#game.next();
            this.turn.dropToken();

        } */
    }

    doUserColumnSelected(e){

        if(this.#waitForUserInput) {

            // en el caso de que alguien este esperando que me coloquen una ficha ..
            this.#waitForUserInput = false; // ya no estoy esperando ..
             let column = e.detail.column; 
            let player = this.#game.getActivePlayer();

            console.log('columna', column );
            player.dropToken(column);
            this.updateBoard(player);
            //this.#game.getActivePlayer().dropToken(column);
        }
       
        
    }

    updateBoard(player) {
       
         this.board.updateBoard();
 
         // preguntamos si el juego esta terminado .. 
         if(this.#game.isFinished()){
             // si ha terminado .. muestra el ganador..necesitamos saber quien es el ganador...
            // 2 - 1,50
             let messageText = Message.PLAYER_WIN.toString();
             messageText = messageText.replace(`#color`, player.getColor().toString()); 
             (new Message(messageText)).write();
 
 
 
         }else {
             this.#game.next();
             this.turn.dropToken();
 
         }

    }

    doWaitForUserInput() {
        this.#waitForUserInput = true; 
        // ejecuta manejador de enventos .. 
        // ahora si estoy esperando que alguien me mande algo .. 
    }
}
customElements.define('c4-game', C4Game);
