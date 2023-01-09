import { LitElement, html, css } from 'lit';
import './ui/c4-button';

// para calcular el numero de jugadores 

export class C4PlayerSelector extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                max-width: 460px;
                color: #fff;
                padding: 1rem;

             
            }
            h1 {
                font-weight: 300;
            }
            ul {
                margin: 0;
                padding: 0;
            }
            li {
                display: inline-block;
                padding: 0;
                margin : 0.5rem;
                list-style-type: none;


            }
            li:first-child {
                margin-left: 0;
            }
        `
    ];

    render() {
        return html`
        <h1> Select number of players </h1>
        <ul>
            <li><c4-button white @click=${this.setPlayers(1)}> One Player </c4-button></li>
            <li><c4-button white @click=${this.setPlayers(2)}> Two Player </c4-button></li>
            <li><c4-button white @click=${this.setPlayers(0)}> Demo / Machine </c4-button></li>
            
        </ul>
        `;
    }

   /*  setOnePlayer() {
        this.setPlayers(1);
    }
    setTwoPlayer() {
        this.setPlayers(2);
    }
    setDemoPlayer() {
        this.setPlayers(0);
    } */

    
    setPlayers(numPlayers) {
        return function() {
            this.dispatchEvent(new CustomEvent('set-players', {
                detail: {
                    numPlayers
                }
            }));
        }
    }
    
    MalsetPlayers(numPlayers){
        //recibe jugadores 
        //inicia juego .. responsabiliddad la tiene el Game 
        // avisa al componente padre e informa del numero de jugadores .. nada mas...
        //js nativo burbujeando de hijo a padre sube... 
     //**** */   this.dispatchEvent(new CustomEvent('set-players', {
            //bubles: true,
            //composed: true, // esto haria falta para forzar ..
     //**** */       detail: {numPlayers} // paso objeto  
        
     console.log('c4-player-selector', numPlayers);
     return function(numPlayers){
          
            this.dispatchEvent(new CustomEvent('set-players', {
                 detail: {
                     numPlayers
                    }
                }));
        
        }
    }
}
customElements.define('c4-player-selector', C4PlayerSelector);


