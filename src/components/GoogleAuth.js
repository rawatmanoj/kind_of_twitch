import React from 'react';

class GoogleAuth extends React.Component{

    componentDidMount(){

      window.gapi.load('client:auth2',()=>{
          window.gapi.client.init({
              clientId:'966673686056-d46adbdf2a6qcj503l8mhrfgjc35qpd0.apps.googleusercontent.com',
              scope:'email'
          });
      });

    }

     render(){
         return <div>GoogleAuth</div>
     }

}

export default GoogleAuth;