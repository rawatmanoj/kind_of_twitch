import React from 'react';
import flv from 'flv.js'
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamShow extends React.Component{

    constructor(props){
        super(props);

        this.videoRef= React.createRef();
    }

    componentDidUpdate(){
        this.buildPlayer();
       
    }

    componentDidMount(){

        
       
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }

        const {id}=this.props.match.params;

        this.player =  flv.createPlayer({
            type:'flv',
            url:`http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render(){
        if(!this.props.Stream){ 
            return <div>Loading...</div>;
        }
          return (
              <div>
                  <video ref={this.videoRef} style={{width:'100%'}} controls={true}/>
                 <h1>{this.props.Stream.title}</h1>
                 <h5>{this.props.Stream.description}</h5>
              </div>
            );
      };
}

const mapStateToProps = (state,ownProps)=>{
      return{Stream:state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps,{fetchStream})(StreamShow);