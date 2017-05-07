import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


class Header extends React.Component {
  render() {
    return (
	    <div>
	      <h1>Convertidor de unidades</h1>
        <p> Escribe la cantidad a convertir y selecciona las unidades</p>
	    </div>
    );
  }
}

class Convertidor extends React.Component{
  constructor(props){
    super(props);    
    this.state = {
      selectedOption1: "m", 
      selectedOption2: "m", 
    //putText:0
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.renderCalculo = this.renderCalculo.bind(this);
    this.radioCalculo1 = this.radioCalculo1.bind(this);
    this.radioCalculo2 = this.radioCalculo2.bind(this);
    this.switchCalculo = this.switchCalculo.bind(this);
    this.delete = this.delete.bind(this);
    this.randomize = this.randomize.bind(this);




  }
   
  handleChange1 (unit) {
    this.setState({
      selectedOption1: unit,
      outputText:this.radioCalculo1(unit)
    });
  }

  handleChange2 (unit) {
    this.setState({
      selectedOption2: unit,
      outputText:this.radioCalculo2(unit)
    });
  }


  inputHandler(evt){
    this.setState({
      inputText:evt.target.value,
      outputText:this.renderCalculo(evt.target.value)
    });
  }
  
  renderCalculo(evt){
    var sel1=this.state.selectedOption1;
    var sel2=this.state.selectedOption2;
    var valor=evt;
    return (this.switchCalculo(sel1, sel2, valor));
  }

  radioCalculo1(unit){
    var sel1=unit;
    var sel2=this.state.selectedOption2;
    var valor=this.state.inputText;
    return (this.switchCalculo(sel1, sel2, valor));
  }

  radioCalculo2(unit){
    var sel1=this.state.selectedOption1;
    var sel2=unit;
    var valor=this.state.inputText;
    return (this.switchCalculo(sel1, sel2, valor));
  }
  radioCalculoRandom(unit1, unit2){
    var sel1=unit1
    var sel2=unit2;
    var valor=this.state.inputText;
    return (this.switchCalculo(sel1, sel2, valor));
  }

  switchCalculo(sel1, sel2, valor){
    var v1=0;
    switch(sel1){
      case "mi":
          v1=valor*1609.34;
          break;
      case "km":
          v1=valor*1000;
          break;
      case "m":
          v1=valor;
          break;    
      case "yd":
          v1=valor/1.0936;
          break;
      case "ft":
          v1=valor/3.2808;
          break;
      case "inch":
          v1=valor/39.370;
          break;  
      case "cm":
          v1=valor/100;      
          break;            
    }
    
    var v2=0;
    switch(sel2){
      case "mi":
          v2=v1/1609.34;
          break;
      case "km":
          v2=v1/1000;
          break;
      case "m":
          v2=v1;
          break;    
      case "yd":
          v2=v1*1.0936;
          break;
      case "ft":
          v2=v1*3.2808;
          break;
      case "inch":
          v2=parseFloat(v1*39.370);
          break;  
      case "cm":    
          v2=parseFloat(v1*100);             
          break;             
    }
    return v2;
  }

  delete(){
    this.setState({
      inputText: "",
      //inputText: 0,
      outputText:0
    });
  }

  randomize(){
    var c=["mi","km","m","yd","ft","inch","cm"];
    var rnd1= Math.floor(Math.random() * 7) + 0;  
    var rnd2= Math.floor(Math.random() * 7) + 0; 
    this.setState({
      selectedOption1: c[rnd1],
      selectedOption2: c[rnd2],
      outputText:this.radioCalculoRandom(c[rnd1], c[rnd2])
    });
  }


  render(){
    const unit = ["mi", "km", "m", "yd", "ft", "inch", "cm"];
    const listaunidades1 = unit.map((unit) =>
         <div className="grupo g1" key={unit.toString()} onClick={()=> { this.handleChange1(unit) }}>
            {unit}<br /><br />
            <input type="radio" name="medida1"  checked={this.state.selectedOption1 === unit}  onChange={ ()=> { this.handleChange1(unit) } } ref={unit} /> 
         </div>
         );
     const listaunidades2 = unit.map((unit) =>
         <div className="grupo g2" key={unit} onClick={()=> { this.handleChange2(unit) }}>
            {unit}<br /><br />
            <input type="radio" name="medida2" checked={this.state.selectedOption2 === unit} onChange={ ()=> { this.handleChange2(unit) }} ref={unit} /> 
         </div>
         );

    return(
        <div>

          <div>
            <input type="number" className="input" id="entrada" onChange={this.inputHandler} value={this.state.inputText}/><br /><br />
          </div> 

          <div>
           <form>{listaunidades1}</form>
           <form>{listaunidades2}</form>
          </div>

          <div>
            <br /><input type="number" className="input" id="salida" value={this.state.outputText} readOnly /><br />
          </div>

          <div>
            <br /><input type="image" className="icon" onClick={this.delete} src="../img/borrar.png" />
            <input type="image" className="icon" onClick={this.randomize} src="../img/aleatorio.png" />
          </div>

        </div>

      );
  }
}




function App1() {
  return (
    <div>
    	<Header />
      <Convertidor />
    </div>
  );
}



ReactDOM.render(
  <App1 />,
  document.getElementById('root')
);

