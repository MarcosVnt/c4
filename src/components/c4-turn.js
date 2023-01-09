import { LitElement, html, css } from 'lit';
import { Message } from '../views/Message';


export class C4Turn extends LitElement {


    static styles = [
        css`
        :host {
            display: block;
            margin-top: 1.2rem;
        }
        main {
            display: flex;
            justify-content: space-between;
            padding: 0 0.6rem 0.3rem 0;
        }
        .player {
            display: flex;
            flex-direction: row;
            margin: 0.4rem 0.2rem;
            align-items: center;
            opacity: 0.2;
        }
        c4-token {
            margin-right: 1rem;
        }
        .active {
            opacity: 1;
        }
        @media(min-width: 635px) {
            main {
                flex-direction: column;
            }
        }
    `
    ];


    static get properties() {
        return {
            game: { type: Object }, // game pasa a turno el juego ..
            activeColor: { type: String},
           
        };
    }

    render() {
        return html`
            <main>
                <article class="player ${this.activeColor === 'Red' ? 'active': ''}">
                    <c4-token color="R"></c4-token>
                    <span>Red</span>
                </article>
                <article class="player ${this.activeColor === 'Yellow' ? 'active': ''}">
                    <c4-token color="Y"></c4-token>
                    <span>Yelow</span>
                </article>
            </main>
        
        `;
    }


    dropToken() { //pon ficha eres rojo o amarillo .?? 
        // como sabe que color es .. el
        //turno necesita el game tamien...

        let activePlayer = this.game.getActivePlayer(); // ya tengo el jugador activo.

        //pero de que color es ????
        // el modelo .. tiene metodo que devuelve color..
        this.activeColor = activePlayer.getColor().toString();
        console.log('---activeColor', this.activeColor);
        activePlayer.accept(this); // doble despalcho .. 
        console.log('--- Active Player.accpet',this);
        console.log('--- Active Player.accpet',this.game);
        console.log('--- Active Player.accpet',this.game.getActivePlayer());


    }

    visitUserPlayer(userPlayer){
        console.log('userPlayer');
        Message.TURN.write();
        console.log('---visitUser--',userPlayer.getColor().toString());
        let message = new Message(userPlayer.getColor().toString()); 
        message.append();

        Message.ENTER_COLUMN_TO_DROP.append();
        this.dispatchEvent(new CustomEvent('wait-for-user-input')); // este evento no envia nada solo avisa tienes que esperar a que alguien te diga algo ..
        // en el juego lo escuchamos...


        /* console.writeln(this.getActivePlayer().getColor().toString());// color de jugador activo ...
        column = console.readMumber(Message.ENTER_COLUMN_TO_DROP.toString()) -1;
        new UserPlayerView(userPlayer).dropToken(); */

    }

    visitMachinePlayer(machinePlayer){

        setTimeout(() => {

       
            // new MchinePlayerView(machinePlayer).dropToken();
                // devuelve columna aleagoria ... 
                console.log('visit machine player', machinePlayer.getColumn());
                let column = machinePlayer.getColumn();
                // turno no actualiza juego .. si no envia envento..
                //en vez de en game pongo ficha aqui...
                machinePlayer.dropToken(column);

                this.dispatchEvent(new CustomEvent('machine-player-column', {
                    detail: {
                        index: column ,
                        player: machinePlayer, // le paso el jugador al game ... 
                    }
                }));
                console.log('visitMachinPlayer',column);

         },600);
        
    }



    
}
customElements.define('c4-turn', C4Turn);
