import React from 'react';

class GoogleAuth extends React.Component{

    state={isSignedIn:null};

    componentDidMount(){

      window.gapi.load('client:auth2',()=>{
          window.gapi.client.init({
              clientId:'966673686056-d46adbdf2a6qcj503l8mhrfgjc35qpd0.apps.googleusercontent.com',
              scope:'email'
          }).then(()=>{
              this.auth=window.gapi.auth2.getAuthInstance();
              this.setState({isSignedIn:this.auth.isSignedIn.get()});
              this.auth.isSignedIn.listen(this.onAuthChange);
          });
      });

    }

    onAuthChange=()=>{
        
        this.setState({isSignedIn:this.auth.isSignedIn.get()});
    }



     renderAuthButton(){
         if(this.state.isSignedIn===null){
             return null;
         }else if(this.state.isSignedIn){

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

export default GoogleAuth;