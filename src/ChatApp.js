import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import _ from 'lodash';
import { Card , Button, Header, Grid, Segment, Input, Label, Icon } from 'semantic-ui-react';

let arr = [];
var config = {
  apiKey: "AIzaSyBB3mauf9V04JFJJKaAGqCF38MkOi1lIj4",
  authDomain: "sezzle-43691.firebaseapp.com",
  databaseURL: "https://sezzle-43691.firebaseio.com",
  projectId: "sezzle-43691",
  storageBucket: "sezzle-43691.appspot.com",
  messagingSenderId: "510160891877"
};
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('chatApp');
const uid = firebase.database().ref().child('chatApp').push().key;
// dbRefObject.on('value', (el )=> {

// });

let ADD = '+', SUB = '-', MUL = '*', DIV = '/';

class ChatApp extends Component {

  constructor(props){
    super(props);
    this.state = {
     castingDirector_id: null,
     actor_id: null,
     showWindow: 'none',
     window_header: 'Click here to Open Chat window',
     chat_arr: [],
     message: null
    }
  }

componentDidMount(){
    dbRefObject.on('value', (el )=> {
        console.log("data finally...", el.val());
        arr.push(el.val());console.log("array::", arr);
        this.setState({chat_arr: arr});console.log("component::state arr", this.state.chat_arr)
    });
} 
handleKeyPress(){

}

updateFirebase(){
    return new Promise((resolve, reject) =>{console.log("message::", this.state.message)
      
            this.setState({uid: this.state.count})
                var data = {
                user_id: uid,
                message: this.state.message
                }

                var updates = {};
                updates['/chatApp/'] = data;
                firebase.database().ref().update(updates);
                console.log("user is updated")
                resolve("data sent...")
    })
}

sendData(event) {console.log("message", this.state.message)
   // arr.push(this.state.message);
    this.setState({chat_arr: arr});
    this.updateFirebase().then((res) => {
        console.log("res", res);
        // new Promise((resolve, reject) => {
        //     dbRefObject.on('value', (el )=> {
        //         console.log("data finally...", el.val());
        //         arr.push(el.val());console.log("array::", arr);
        //         this.setState({chat_arr: arr});console.log("state arr", this.state.chat_arr)
        //     });
        // })
    })
   
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

  
  openChat(){
      console.log("di23vrf2g");
      this.setState({showWindow: 'inline',  window_header: 'Click here to Close Chat window'})
  }

  render() {
   // bake_cookie("list_cal", this.state.list_calculation)
    console.log("this.state",  this.state.chat_arr, uid)
    return (
      <div className="App" style={{position:'fixed', bottom: '0', right: '0'}}>
        <Card>
            <Card.Content>
                <Button fluid labelPosition="right"
                    //content={this.state.window_header} 
                    icon="minus" color="blue" onClick={this.openChat.bind(this)} 
                />
            </Card.Content>
            <Card.Content style={{display: this.state.showWindow}}>
                {
                    _.map(this.state.chat_arr, (el, i) => {console.log("krg", el);
                        if(el.user_id === uid){
                            return <div key={i} float="right">
                                    <Label>{el.message}</Label>
                                </div>
                        }
                        else{
                            return <div key={i} float="left">
                                    <Label  color="blue">{el.message}</Label>
                                </div>
                        }
                        
                    })
                }
            </Card.Content>
            <Card.Content>
                <Input 
                    type="text" 
                    placeholder="type your text here" 
                    icon={<Icon name='send' inverted circular link onClick={this.sendData.bind(this)} />}
                    onChange={(e) => {this.setState({message: e.target.value})}}
                    //onKeyPress={this.handleKeyPress.bind(this)}
                />
            </Card.Content>
        </Card>
        {/* <Card>
            <Card.Content>

                <Card.Header>
                    RECENT USERS
                </Card.Header>

                <Card.Description>
                    hii
                </Card.Description>
            </Card.Content>
        </Card> */}
            
      </div>
    );
  }
}

export default ChatApp;
