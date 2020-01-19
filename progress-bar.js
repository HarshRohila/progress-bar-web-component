import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
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
        #container {
          display: flex;
        }
        step-circle {
          z-index: 1;
        }
        #step-container {
          width: [[stepContainerWidth]]px;
        }
      </style>
      <div id="container">
        <template is="dom-repeat" items="{{arr}}">
          <div id="step-container" style="width: [[stepContainerWidth]]px">
            <step-circle id="circle-[[index]]">[[item.name]]</step-circle>
          </div>
        </template>
      </div>
    `;
  }
  constructor() {
    super();
    this.set('stepContainerWidth', 0);
    this.arr = [];
    this.steps = [];
    this.addEventListener('percent-completed-changed', this.percentCompletedChanged.bind(this), false);
  }
  percentCompletedChanged({ detail }) {
    const perc = detail.value;
    console.log(detail.value);
    const currentStepIndex = this.arr.findIndex(i => i.isDone === false);
    if (perc === 100) {
      this.arr[currentStepIndex].isDone = true;
    }
    const stepCircle = this.shadowRoot.getElementById(`circle-${currentStepIndex}`);
    if (stepCircle) {
      stepCircle.percentCompleted = perc;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    
    console.log(this.steps);
    let arr = [];
    for (let i = 0; i < this.steps.length; i++) {
      arr.push({
        name: this.steps[i],
        isDone: false
      });
    }
    console.log(arr);
    this.set('arr', arr);

    const child = this.shadowRoot.getElementById('container');
    const stepContainerWidth = child.clientWidth / this.steps.length;
    this.set('stepContainerWidth', stepContainerWidth);
  }
  static get properties() {
    return {
      steps: {
        type: Array
      },
      percentCompleted: {
        type: Number,
        notify: true,
        value: 0
      },
      stepContainerWidth: Number
    };
  }
}

window.customElements.define('progress-bar', ProgressBar);
