import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `progress-bar`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ProgressBar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'progress-bar',
      },
    };
  }
}

window.customElements.define('progress-bar', ProgressBar);
