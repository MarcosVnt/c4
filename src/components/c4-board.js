import { LitElement, html, css } from 'lit';
import {Coordinate} from '../types/Coordinate';
import './c4-token';

export class C4Board extends LitElement {
    static styles = [
        css`
            :host {
                width: 100%;
                margin: 1rem;
                display: grid;
                grid-template-columns: repeat(${Coordinate.NUMBER_COLUMNS}, auto);
                column-gap: 0.4rem;
                row-gap: 0.6rem;

            }
        `
    ];
    static get properties() {
        return {
            game: { type: Object }, // viene el game del board
            boardColors: { type: Array},
        };
    }
    constructor() {
        super();
        this.boardColors = [];
    }

   /*  render() {
        return html`
         ${this.boardColors.map(color => {
             console.log(color);
             return `<span>${color}</span>`;
         })}
        `;
    }
 */
    render() {
        return html`
         ${this.boardColors.map((color , index) => html`
            <c4-token 
                index="${index}" 
                color="${color}"
                @token-selected=${this.doTokenSelected}
            
            ></c4-token>
            `)}
         `;
         // map pilla todos los elementos del array y por cada uno pasa callback... 
         // se ejecuta 42 veces que son los elementos del array ..
         // lo que devuelve la funcion callbac se mente en un nuevo array que devuelve map....
         // lit con html convierte <p> </p> a html...
    }

    updateBoard() {
        let colors = [];
        console.log('bbbbbb',this.game);

        for (let i = Coordinate.NUMBER_ROWS -1; i>=0; i--){
            for (let j = 0 ; j < Coordinate.NUMBER_COLUMNS; j++){
                colors.push(`${this.game.getColor(new Coordinate(i,j)).toString()[0]}`)  // obtiene color de una coordenada ... 

            }
           
        }
            //consutruimos el tablero 
            this.boardColors = colors; // boardcolors prpo reactiva ...a propiedad pongo array...
            //cuando cambie boardColors cambia tablero...  ir a return 
            console.log('construido tablero ',colors);

        
    }

    doTokenSelected(e) {
        let column = this.getColumnIndex(e.detail.index);
        console.log('doTokenSelected',column); // solo necesitamos la columna 
        let valid = Coordinate.isColumnValid(column);
        if(!valid){
            Message.INVALID_COLUMN.write();
        } else {
            valid = ! this.game.getActivePlayer().isComplete(column);
            //this.game.getActivePlayer.isComplete(column);
            if(!valid) {
                Message.COMPLETED_COLUMN.write();

            }
        }
        // avisamos al padre
        if(valid){
            // board sabe convertir numero en posicion .. 
            this.dispatchEvent(new CustomEvent('column-selected', {
                detail: {
                    column
                }
            }))
        }
    }

    getColumnIndex(tokenIndex) {
        return tokenIndex % Coordinate.NUMBER_COLUMNS;
    }
}
customElements.define('c4-board', C4Board);
