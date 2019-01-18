import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import * as $ from 'axios';
import { ChromePicker } from 'react-color';

const unsplash = new Unsplash({
  applicationId: process.env.APPLICATION_ID,
  secret: process.env.SECRET

});


const Header = (props) => (
  <div className='header'>
    <h1 className='headerText'>ChroMatch</h1>
    <PicSlideShow />
  </div>
)
const SearchForm = (props) => (
  <form className='search'>
    <input className='inputField' value={props.value} onChange={props.changeHandler} />
    <button className='searchButton' onClick={props.sendData}>Search</button>
  </form>
);

const PicSlideShow = (props) => (
  <div>
    picture slideshow here
  </div>
)

const ColorSelectBox = (props) => (
  <div className='bigBox Container'>Big box
    <div>
      <ColorBox clickHandler={props.clickHandler} />
    </div>
    <div>
      <ColorBox clickHandler={props.clickHandler} />
    </div>
    <div>
      <ColorBox clickHandler={props.clickHandler} />
    </div>
    <div>
      <ColorBox clickHandler={props.clickHandler} />
    </div>
    <div>
      <ColorBox clickHandler={props.clickHandler} />
    </div>

  </div>
)

const ColorBox = (props) => (
  <div onClick={props.clickHandler} className='color box'>
    Color Box
</div>
)



const TopResults = (props) => (
  <div className='top picture results'>
  {props.results.map((pic) =>  <p>{pic.color}</p>)}
          </div>

)

const AllResults = (props) => (
  <div className='all picture results'>
    All Results
  </div>
)



class App extends Component {

  state = {
    color: '',
    input: '',
    background: '#fff',
    displayColorPicker: false,
    results: []
  }




  handleChange = (event) => {
    this.setState({ input: event.target.value })
  }


  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleResults = () => {
    unsplash.photos.listPhotos(2, 15, "latest")
  .then(json => {
    // this.setState({results: json})
    console.log(json)
  });
  }

newPhoto = (event) => {
  event.preventDefault();
    $.post('/api/matchingPic', {color: this.state.input})
    .then( () => {
      this.getPicName();
    })
}

getPicName = () => {
  $.get('/api/matchingPic')
  .then((result) => {
    this.setState({results: result.data})
  }).then( () => {
    
  })
}

componentDidMount() {
  this.getPicName()
}
  //   handleSubmit = (event) => {
  //     event.preventDefault()
  //     axios.post(`/api/matchingPicSchema`)
  //     .then(res => {
  //       const matchingPic = res.data;
  //       this.setState({ matchingPic });
  //     })
  // }

  // componentDidMount() {
  //   axios.get(`https://api.unsplash.com/`)
  //   .then(res => {
  //     const picMatch = res.data;
  //     this.setState({ picMatch });
  //   })
  // }


  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div>
        <Header />
        <SearchForm
          value={this.state.searchVal}
          changeHandler={this.handleChange} 
          findPhotos={this.handleResults}
          sendData={this.newPhoto}/>

        {this.state.displayColorPicker ? <div style={popover}>
          <div style={cover} onClick={this.handleClose} />
          <ChromePicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete} />
        </div> : null}
        <ColorSelectBox clickHandler={this.handleClick} />
        <TopResults results={this.state.results}/>
        <AllResults />
     
     

      </div>
    );
  }
}

export default App;
