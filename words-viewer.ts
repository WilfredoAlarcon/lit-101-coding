import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('words-viewer')
class WordsViewer extends LitElement {

  @state() private index = 0;
  @state() private playDirection = 1;  
  @property() words: string = '';
  
  private intervalTimer?: number;
  
  override connectedCallback() {
    super.connectedCallback();
    this.intervalTimer = setInterval(this.tickToNextWord, 1000);
  }
  
  override disconnectedCallback () {
    super.disconnectedCallback();
    clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }
  
  render() {
    const splitWords = this.words.split('.');
    return html`<pre
        @click=${this.switchPlayDirection}
        >${splitWords[((this.index % splitWords.length) + splitWords.length)
        % splitWords.length]}</pre>`;
  }
  
  tickToNextWord = () => { this.index += this.playDirection; };
  switchPlayDirection = () => { this.playDirection *= -1; };
}
