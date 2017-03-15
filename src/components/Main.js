import {h, Component} from 'preact';
import {compilePugTemplate} from '../api';

export default class extends Component {
  state = {output: ''};
  process = async (e) => {
    let source = this.textSource.value;
    let res = await compilePugTemplate(source);
    this.setState({
      output: res.out
    });
  }
  render(){
    return(
      <div>
        <h1>PUG REPL</h1>
        <textarea name="source" id="" cols="30" rows="10" ref={comp => this.textSource = comp}></textarea>
        <textarea name="output" id="" cols="30" rows="10" value={this.state.output}>

        </textarea>
        <div>
          <button onClick={e => this.process() }>Generate</button>
        </div>
      </div> 
    );
  }
}