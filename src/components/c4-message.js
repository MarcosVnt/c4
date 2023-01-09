import { LitElement, html, css } from 'lit';


export class C4Message extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    static get properties() {
        return {
            message: { type: String }, // propiedad reactiva ...
        };
    }

    constructor() {
        super();
        this.message = ""
        window.addEventListener('new-message', (e) => this.showMessage(e.detail.message));
        window.addEventListener('append-message', (e) => this.appendMessage(e.detail.message))


    }

    render() {
        return html`
            ${this.message}
        `;
    }

    showMessage(message) {
        console.log('showMessage', message);
        this.message = message; // seteamos propiedad del componente
    }

    appendMessage(message){
        this.message += ' '+ message; 
    }
}
customElements.define('c4-message', C4Message);
