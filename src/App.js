import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import _ from 'lodash';
import { Card , Button, Header, Grid, Segment, Input, Label } from 'semantic-ui-react';

//let arr = [];
var config = {
  apiKey: "AIzaSyBB3mauf9V04JFJJKaAGqCF38MkOi1lIj4",
  authDomain: "sezzle-43691.firebaseapp.com",
  databaseURL: "https://sezzle-43691.firebaseio.com",
  projectId: "sezzle-43691",
  storageBucket: "sezzle-43691.appspot.com",
  messagingSenderId: "510160891877"
};
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('users');

dbRefObject.on('value', (el )=> {

});

let ADD = '+', SUB = '-', MUL = '*', DIV = '/';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: null,
      number1: 0,
      number2: 0,
      operator: null,
      result: 0,
      uid: null,
      count: 0,
      start_index: 0,
      list_calculation:null
    }
  }

componentDidMount(){
  console.log("dbRefObject", dbRefObject)
  let arr = [];
    dbRefObject.on('value', (el )=> {
        if(el !== null) {
          arr = el.val();console.log("arr.length", el.val().length)
        this.setState({count: arr.length})
        //counter++;console.log("snap", el.val(), counter, arr[1], arr[2], typeof arr.length);
        for(var i=0;i<=arr.length-1;i++){
          console.log("item", arr[i])

          // localStorage.setItem("calculation_list", arr[i+1])
        }
        this.setState({list_calculation: arr})

      }
    });
} 

writeUserData(event) {
  
  const uid = firebase.database().ref().child('users').push().key;
  this.setState({uid: this.state.count})
    var data = {
      user_id: uid,
      username: this.state.username,
      number1: this.state.number1,
      number2: this.state.number2,
      operator: this.state.operator,
      result: this.state.result
    }

    var updates = {};
    updates['/users/' + this.state.count] = data;
    firebase.database().ref().update(updates);
    console.log("user is updated")

   
  }

  deleteUserData(){
    delete_cookie("list_cal");console.log("delete", read_cookie("list_cal"));
    this.setState({list_calculation: []})
   // window.close();
    // let length = this.state.list_calculation.length;
    // for(var i=1; i<=length-1; i++){
    //   firebase.database().ref().child('/users/'+i).remove();
    // }
    
  }

  clear(){
    this.setState({
      username: null,
      number1: 0,
      number2: 0,
      operator: null,
      result: 0,
      uid: null,
      count: 0,
     // list_calculation:null
    })
  }

  performOperation(e, val){//console.log("jjj", e)
    this.setState({operator: e});
    switch(e){

      case '+': 
        return this.state.result = parseInt(this.state.number1) + parseInt(this.state.number2)
        break;

      case '-':
        return this.state.result = parseInt(this.state.number1) - parseInt(this.state.number2)
        break;  

      case '*':
        return this.state.result = parseInt(this.state.number1) * parseInt(this.state.number2)
        break;  

      case '/':
        return this.state.result = parseInt(this.state.number1) / parseInt(this.state.number2)
        break;

    }
  }

  render() {
    bake_cookie("list_cal", this.state.list_calculation)
    console.log("this.state",  read_cookie("list_cal"))
    return (
      <div className="App">
        <Grid stackable columns={1}>
          <Grid.Column>
            <Segment>
              <Label> EmailID</Label>
              <Input type="text" onChange={(e) => {this.setState({username: e.target.value})}}/> <br />

              <Label> First Number</Label>
              <Input type="number" value={this.state.number1} onChange={(e) => {this.setState({number1: e.target.value})}}/><br />
              
              <Label> Second Number</Label>
              <Input type="number" value={this.state.number2} onChange={(e) => {this.setState({number2: e.target.value})}}/><br />
              
              <Label> Result</Label>
              <Input type="number" value={this.state.result} /> <br/>

              <Button color="twitter" onClick={this.performOperation.bind(this, ADD)} content="+" />
              <Button color="twitter" onClick={this.performOperation.bind(this, SUB)} content="-" />
              <Button color="twitter" onClick={this.performOperation.bind(this, MUL)} content="*" />
              <Button color="twitter" onClick={this.performOperation.bind(this, DIV)} content="/" />
              <Button color="twitter" icon="paper plane" onClick={this.writeUserData.bind(this)} content="Submit" />
              
              <Button color="red" onClick={this.deleteUserData.bind(this)} icon="user delete" content="End Session" />
              
             
              <Button color="blue" onClick={ this.clear.bind(this) } content="Clear" icon="eraser" />
            </Segment>
            <Segment>
              <Card fluid>
                  <Card.Content>
                  
                    <Card.Header>RECENT USERS</Card.Header>
                   
                    <Card.Description>
                      {
                        _.map(_.reverse(read_cookie("list_cal")), (el, i) => {console.log("el::", el)
                          
                          if( i < 10){
                            if(i !== this.state.list_calculation.length-1){
                              return <p key={i}>{el.username}  {el.number1} {el.operator} {el.number2} = {el.result}</p>
                            }
                          }
                          else{
                            return null;
                          }
                          })
                      }
                    </Card.Description>
                  </Card.Content>
                    <Card.Content extra>
                  </Card.Content>
                </Card>
            </Segment>
          </Grid.Column>
          {/* <Grid.Column>
            <Segment>
              <Card fluid>
                <Card.Content>
                
                  <Card.Header>Steve Sanders</Card.Header>
                  <Card.Meta>Friends of Elliot</Card.Meta>
                  <Card.Description>
                  Steve wants to add you to the group <strong>best friends</strong>
                  </Card.Description>
                </Card.Content>
                  <Card.Content extra>
                  <div className='ui two buttons'>
                  <Button basic color='green'>
                  Approve
                  </Button>
                  <Button basic color='red'>
                  Decline
                  </Button>
                  </div>
                </Card.Content>
              </Card>
            </Segment>
          </Grid.Column> */}
        </Grid>
       
      </div>
    );
  }
}

export default App;
