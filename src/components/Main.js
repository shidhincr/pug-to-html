import {h, Component} from 'preact';
import pug from 'pug';

export default class extends Component {
  state = {output: ''};
  process = (e) => {
    let source = e.target.value;
    let output = source;
    // console.log(pug);
    // let fn = pug.compile(source, {});
    // let output = fn({}); // This {} will be the locals later
    this.setState({
      output
    });
  }
  render(){
    return(
      <div>
        <h1>PUG REPL</h1>
        <textarea name="source" id="" cols="30" rows="10" onKeyUp={this.process}>

        </textarea>
        <textarea name="output" id="" cols="30" rows="10" value={this.state.output}>

        </textarea>
      </div>
    );
  }
}