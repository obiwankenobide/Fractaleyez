import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './Presets.css'

import { connectConfig } from '../config/context/ConfigProvider'

class Presets extends React.Component {
  render() {
    return(
      <Row>
        <Col className='presets-container'>
          <button onClick={this.props.retrieveConfigPreset}>Default</button>
          <button onClick={this.props.retrieveConfigPreset}>Edge Chase Spin</button>
          <button onClick={this.props.retrieveConfigPreset}>Dispersion Tunnel Spin</button>
          <button onClick={this.props.retrieveConfigPreset}>Crossheir Spin</button>  
          <button onClick={this.props.retrieveConfigPreset}>Pointerz</button>            
          <button onClick={this.props.retrieveConfigPreset}>Galaxy Space</button>
          <button onClick={this.props.retrieveConfigPreset}>Galaxy Salad</button>
          <button onClick={this.props.retrieveConfigPreset}>Galaxy Portal</button>
          <button onClick={this.props.retrieveConfigPreset}>Galaxy Spiral</button>
          <button onClick={this.props.retrieveConfigPreset}>Color Portal</button>
          <button onClick={this.props.retrieveConfigPreset}>Oh Sprite</button>
          <button onClick={this.props.retrieveConfigPreset}>Eye Chase</button>
          <button onClick={this.props.retrieveConfigPreset}>Side Swirl</button> 
          <button onClick={this.props.retrieveConfigPreset}>Circles</button>
          <button onClick={this.props.retrieveConfigPreset}>Square Mandala</button>
          <button onClick={this.props.retrieveConfigPreset}>Notes</button>
          <button onClick={this.props.retrieveConfigPreset}>Note Explosion</button>
          <button onClick={this.props.retrieveConfigPreset}>Fire</button>    
          <button onClick={this.props.retrieveConfigPreset}>Weed</button>                   
          <button onClick={this.props.retrieveConfigPreset}>Chopping Hands</button>    
          <button onClick={this.props.retrieveConfigPreset}>Slime Hands</button>   
          <button onClick={this.props.retrieveConfigPreset}>Bassyndicate</button>
          <button onClick={this.props.retrieveConfigPreset}>Honeycomb</button>
          <button onClick={this.props.retrieveConfigPreset}>Vibe Emissions</button>
          <button onClick={this.props.retrieveConfigPreset}>Vibe Emissions Pyramid</button>
          <button onClick={this.props.retrieveConfigPreset}>Hyper Vibe Emissions</button>
          <button onClick={this.props.retrieveConfigPreset}>Vibe Emissions Spin</button>
          <button onClick={this.props.retrieveConfigPreset}>Vibe Emissions Salad</button>
          <button onClick={this.props.retrieveConfigPreset}>Lyk Magik</button>
          <button onClick={this.props.retrieveConfigPreset}>Hyper Lyk Magik</button>
          <button onClick={this.props.retrieveConfigPreset}>Lyk Magik Spin</button>
          <button onClick={this.props.retrieveConfigPreset}>Deep Jeep</button>
          <button onClick={this.props.retrieveConfigPreset}>Deep Jeep Salad</button>
          <button onClick={this.props.retrieveConfigPreset}>Ganix</button>
          <button onClick={this.props.retrieveConfigPreset}>Psychotrope</button>
          <button onClick={this.props.retrieveConfigPreset}>So Down</button>
        </Col>
      </Row>
    )
  }
}

export default connectConfig(Presets)
