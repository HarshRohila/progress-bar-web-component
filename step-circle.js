import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

class StepCircle extends PolymerElement {
  static get template() {
    return html`
      <style>
        #container {
            display: flex;
            align-items: center;
        }
        #circle {
            border-radius: 50%;
            border: solid 2px;
            width: 30px;
            height: 30px;
            text-align: center;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #bars-container {
            width: 100%;
        }
        .bar {
            height: 6px;
        }
        .background {
            background-color: yellow;
            position: relative;
        }
        .progress {
            position: absolute;
            background-color: red;
            width: 0;
        }
        label {
          position: absolute;
          top: 32px;
        }
        iron-icon {
          position: absolute;
          height: 18px;
        }
      </style>
      <div id="container">
        <div id="bars-container">
            <div class="background bar">
              <div id="progress-bar" class="progress bar"></div>
            </div>
        </div>
        <div id="circle" style="height:[[circleHeight]]px">
          <template is="dom-if" if="[[done]]">
            <iron-icon icon="done"></iron-icon>
          </template>
          <label for="circle"><slot></slot></label>
        </div>
      </div>
    `;
  }
  constructor() {
    super();
    this.done = false;
    this.addEventListener('percent-completed-changed', this.percentCompletedChanged.bind(this), false);
  }
  percentCompletedChanged({ detail }) {
    const perc = detail.value;
    const progressBar = this.shadowRoot.getElementById('progress-bar');
    const maxWidth = this.shadowRoot.getElementById('bars-container').clientWidth + 1;
    const width = perc * maxWidth / 100;
    if (perc === 100) {
      this.done = true;
    }
    progressBar.style.width = `${width}px`;
  }
  connectedCallback() {
    super.connectedCallback();
    const circle = this.shadowRoot.getElementById('circle');
    this.circleHeight = circle.clientWidth;
  }
  static get properties() {
    return {
      percentCompleted: {
        type: Number,
        notify: true,
        value: 0
      }
    };
  }
}

window.customElements.define('step-circle', StepCircle);
