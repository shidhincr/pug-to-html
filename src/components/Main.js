import {h, Component} from 'preact';
import './Main.css';
import {compilePugTemplate} from '../api';
import debounce from 'debounce';

import * as ace from 'brace';
import 'brace/mode/jade';
import 'brace/mode/html';
import 'brace/theme/monokai';
import {html as htmlBeautify} from 'js-beautify';

export default class extends Component {
  state = {output: ''};

  autoProcess = e => {
    let source = this.sourceEditor.getValue();
    this.process(source);
  }

  process = async (source) => {
    if(!source){
      this.outputEditor.setValue('');  
      return;
    }
    let res = await compilePugTemplate(source);
    this.outputEditor.setValue(htmlBeautify(res.out));
    this.outputEditor.clearSelection();
  }

  componentDidMount() {
    const process = debounce(this.autoProcess, 500);
    const sourceEditor = ace.edit('sourceEditor');
    sourceEditor.getSession().setMode('ace/mode/jade');
    sourceEditor.getSession().setTabSize(2);
    sourceEditor.setTheme('ace/theme/monokai');

    this.sourceEditor = sourceEditor;

    sourceEditor.on('change', process);
    sourceEditor.on('paste', process);

    const outputEditor = ace.edit('outputEditor');
    outputEditor.getSession().setMode('ace/mode/html');
    outputEditor.setTheme('ace/theme/monokai');
    outputEditor.setReadOnly(true);
    this.outputEditor = outputEditor;
  }
  
  render(){
    return(
      <div class="mdc-typography">
        <header class="mdc-toolbar">
          <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
            <a class="material-icons">menu</a>
            &nbsp;&nbsp;&nbsp;
            <span class="mdc-toolbar__title">PUG to HTML Online</span>
          </section>
          <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
            <a class="mdc-button mdc-button--raised mdc-button--primary" href="">GITHUB</a>
          </section>
        </header>
        <div class="mdc-layout-grid">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <section className="mdc-card__primary">Source - PUG CODE</section>
            <div className="mdc-card" id="sourceEditor"></div>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <section className="mdc-card__primary">Output - HTML CODE</section>
            <div className="mdc-card" id="outputEditor"></div>
          </div>
        </div>
        {/*<div class="mdc-layout-grid">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 actions">
            <button class="mdc-button mdc-button--raised mdc-button--accent" onClick={this.autoProcess}>
              Generate
            </button>
          </div>
        </div>*/}
      </div>
    )
  }
}