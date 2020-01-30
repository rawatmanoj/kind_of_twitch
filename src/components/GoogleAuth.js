import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends React.Component{

    //state={isSignedIn:null};

    componentDidMount(){

      window.gapi.load('client:auth2',()=>{
          window.gapi.client.init({
              clientId:'966673686056-d46adbdf2a6qcj503l8mhrfgjc35qpd0.apps.googleusercontent.com',
              scope:'email'
          }).then(()=>{
              this.auth=window.gapi.auth2.getAuthInstance();
              //this.setState({isSignedIn:this.auth.isSignedIn.get()});
              this.onAuthChange(this.auth.isSignedIn.get());
              this.auth.isSignedIn.listen(this.onAuthChange);
          }); 
      });

    }

    onAuthChange=(isSignedIn)=>{
        
       // this.setState({isSignedIn:this.auth.isSignedIn.get()});
              if(isSignedIn){
                  this.props.signIn(this.auth.currentUser.get().getId());
              }
              else{
                this.props.signOut();
              }
    }



     renderAuthButton(){
        
         if(this.props.isSignedIn===null){
             return null;
         }else if(this.props.isSignedIn){

             return(
                 <button  onClick={()=>this.auth.signOut()} className="ui red google button">
                     <i className="google icon"/>
                     Sign Out
                 </button>
             );
         }else{

            return(
                <button onClick={()=>this.auth.signIn()} className="ui red google button">
                    <i className="google icon"/>
                    Sign In
                </button>
            );
             
         }
     }

     render(){
     return <div>{this.renderAuthButton()}</div>
     }

}

const mapStateToProps=(state)=>{
    return {
        isSignedIn:state.auth.isSignedIn
    };
};

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);