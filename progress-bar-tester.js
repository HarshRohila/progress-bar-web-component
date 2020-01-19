import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class ProgressBarTester extends PolymerElement {
  static get template() {
    return html`
      <progress-bar steps='["Build", "Test", "Deploy"]'></progress-bar>
    `;
  }
  constructor() {
    super();
  }
  connectedCallback() {
      super.connectedCallback();

      const interval = setInterval(() => {
        const t = this.shadowRoot.children[0]
          t.percentCompleted = t.percentCompleted + 1;
          if (t.percentCompleted === 100) {
              t.percentCompleted = 0;
              clearInterval(interval);
              const interval2 = setInterval(() => {
                const t = this.shadowRoot.children[0]
                  t.percentCompleted = t.percentCompleted + 1;
                  if (t.percentCompleted === 100) {
                      clearInterval(interval2);
                  } 
              }, 10);
          } 
      }, 10);
      
  }
}

window.customElements.define('progress-bar-tester', ProgressBarTester);