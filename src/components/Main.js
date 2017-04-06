import {h, Component} from 'preact';
import './Main.css';
import {compilePugTemplate} from '../api';
import debounce from 'debounce';

import * as ace from 'brace';
import 'brace/mode/jade';
import 'brace/mode/html';
import 'brace/mode/json';
import 'brace/theme/monokai';
import {html as htmlBeautify} from 'js-beautify';
/**
 * Get the Javascript object ( locals ) from string.
 * @param {* Object in string format } str 
 */ 
const getParsedObject = str => {
  try {
    return new Function(`return ${str}`)();
  } catch( e ){
    return {};
  }
};

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

    let locals = this.localsEditor.getValue();
    locals = getParsedObject(locals);

    let res = await compilePugTemplate(source, locals);
    this.outputEditor.setValue(htmlBeautify(res.out));
    this.outputEditor.clearSelection();
  }

  setInitialContent = () => {
    this.sourceEditor.setValue(`
div.main
 - for(var i=0; i<data.length; i++)
   div.child
    |#{data[i]}
   `.trim());

   this.localsEditor.setValue(`
{
 data: [
   "Apple",
   "Orange",
   "Grapes",
   "Apricots"
 ] 
}
   `.trim());
    
    this.sourceEditor.clearSelection();
    this.localsEditor.clearSelection();
    this.autoProcess();
  }

  componentDidMount() {
    const process = debounce(this.autoProcess, 500);
    const sourceEditor = ace.edit('sourceEditor');
    const sourceEditorSession = sourceEditor.getSession();
    sourceEditorSession.setMode('ace/mode/jade');
    sourceEditorSession.setTabSize(2);
    sourceEditor.setTheme('ace/theme/monokai');
    sourceEditor.setFontSize(15);

    const localsEditor = ace.edit('localsEditor');
    const localsEditorSession = localsEditor.getSession();
    localsEditorSession.setMode('ace/mode/json');
    localsEditorSession.setTabSize(2);
    localsEditorSession.setOption('useWorker', false);
    localsEditor.setTheme('ace/theme/monokai');
    localsEditor.setFontSize(15);

    this.sourceEditor = sourceEditor;
    this.localsEditor = localsEditor;

    sourceEditor.on('change', process);
    sourceEditor.on('paste', process);
    localsEditor.on('change', process);
    localsEditor.on('paste', process);

    const outputEditor = ace.edit('outputEditor');
    outputEditor.getSession().setMode('ace/mode/html');
    outputEditor.setTheme('ace/theme/monokai');
    outputEditor.setReadOnly(true);
    outputEditor.setFontSize(15);
    this.outputEditor = outputEditor;

    this.setInitialContent();
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
            <a class="mdc-button mdc-button--raised mdc-button--primary" href="https://github.com/shidhincr/pug-to-html">GITHUB</a>
          </section>
        </header>
        <div class="mdc-layout-grid">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
            <section className="mdc-card__primary">Source - PUG CODE</section>
            <div className="mdc-card" id="sourceEditor"></div>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
            <section className="mdc-card__primary">Locals - JSON</section>
            <div className="mdc-card" id="localsEditor"></div>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
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