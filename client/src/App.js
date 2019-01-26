import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import * as $ from 'axios';
import { SketchPicker } from 'react-color';
import Vibrant from 'node-vibrant'
import Palette from 'react-palette';

const dotenv = require('dotenv')


const unsplashId = new Unsplash({
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
  <div>
    {/* <form className='search'>
    <input className='inputField' value={props.value} onChange={props.changeHandler} />
    <button className='searchButton' onClick={props.sendData}>Search</button>
  </form> */}
    <form className="search-form" onSubmit={props.handleSubmit}>
      <label className="is-hidden" htmlFor="search">Search</label>
      <input
        type="search"
        onChange={props.changeHandler}
        value={props.value}
        name="search"
        placeholder="Search..."
      />
      <button type="submit" id="submit" className="search-button">
        <i className="material-icons icn-search">search</i>
      </button>
    </form>
  </div>

);

const PicSlideShow = (props) => (
  <div>
    picture slideshow here
  </div>
)

const ColorSelectBox = (props) => (
  <div className='bigBox Container'>Big box
    <div>
      <div className='color box one' style={props.style1} onClick={props.clickHandler1} >

      </div>
    </div>
    <div>
      <div className='color box two' style={props.style2} onClick={props.clickHandler2} >

      </div>
    </div>
    <div>
      <div className='color box three' style={props.style3} onClick={props.clickHandler3}  >

      </div>
    </div>
    <div>
      <div className='color box four' style={props.style4} onClick={props.clickHandler4} >

      </div>
    </div>
    <div>
      <div className='color box five' style={props.style5} onClick={props.clickHandler5} >

      </div>
    </div>

  </div>
)

const ColorBox = (props) => (
  <div>
    <div style={props.style} onClick={props.clickHandler} className='color box' >

    </div>
  </div>

)



const TopResults = (props) => (
  <div className='top picture results'>
    {props.results.map((pic) => <p>{pic.color}</p>)}
  </div>

)

const AllResults = (props) => (
  <div className='all picture results'>
    All Results
  </div>
)

const Img = props =>
  <li>
    <a href={props.link}>
      <img src={props.url} alt="Unsplash Image here" />
    </a>
    <p>
      Photo by
			<a href={props.user}>{props.name}</a>
      <a href={props.link}> See on Unsplash</a>
    </p>
  </li>;




const NoImgs = props => (
  <li className='no-imgs'>
    <i className="material-icons icon-img">sentiment_very_dissatisfied</i>
    <h3>No Images match your search.</h3>
  </li>
);







class App extends Component {

  state = {
    input: '',
    color: {
      darkMuted: "",
      darkVibrant: "",
      lightMuted: "",
      lightVibrant: "",
      muted: "",
      vibrant: ""
    },
    color1: '#fff',
    color2: null,
    color3: null,
    color4: null,
    color5: null,
    displayColorPicker1: false,
    displayColorPicker2: false,
    displayColorPicker3: false,
    displayColorPicker4: false,
    displayColorPicker5: false,
    imgs: [],
    results: [],
    searchText: '',
    loadingState: true
  }


  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ imgs: '' })
    this.performSearch(this.state.value);
    e.currentTarget.reset();
  };


  handleChange = (event) => {
    this.setState({ input: event.target.value })
  }



  handleChangeComplete1 = (color, event) => {

    this.setState({ color1: color.hex });
  };

  handleOpenColorWheel1 = () => {
    this.setState({ displayColorPicker1: !this.state.displayColorPicker1 })
  };

  handleClose1 = () => {
    this.setState({ displayColorPicker1: false })
  };

  handleChangeComplete2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleOpenColorWheel2 = () => {
    this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
  };

  handleClose2 = () => {
    this.setState({ displayColorPicker2: false })
  };


  handleChangeComplete3 = (color) => {
    this.setState({ color3: color.hex });
  };

  handleOpenColorWheel3 = () => {
    this.setState({ displayColorPicker3: !this.state.displayColorPicker3 })
  };

  handleClose3 = () => {
    this.setState({ displayColorPicker3: false })
  };

  handleChangeComplete4 = (color) => {
    this.setState({ color4: color.hex });
  };

  handleOpenColorWheel4 = () => {
    this.setState({ displayColorPicker4: !this.state.displayColorPicker4 })
  };

  handleClose4 = () => {
    this.setState({ displayColorPicker4: false })
  };

  handleChangeComplete5 = (color) => {
    this.setState({ color5: color.hex });
  };

  handleOpenColorWheel5 = () => {
    this.setState({ displayColorPicker5: !this.state.displayColorPicker5 })
  };

  handleClose5 = () => {
    this.setState({ displayColorPicker5: false })
  };






  handleResults = () => {
    unsplashId.photos.listPhotos(2, 15, "latest")
      .then(json => {
        // this.setState({results: json})
        console.log(json)
      });
  }



  async componentDidMount() {
    // const results = await this.performSearch();
    this.ImgList()
  }

  ImgList = (query = 'sun') => {
    $
    .get(
      `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`
    )
    .then(data => {
      
      let imgs;
      console.log(data)
       data.data.results.map(img => (
          <Palette image={img.urls.full}>
          
            {
              palette => this.setState({ color: palette.vibrant})
  //             (
             
  //           // console.log(palette),
  //           //       <Img
                
  //           //         url={img.urls.thumb}
  //           //         user={img.user.links.html}
  //           //         name={img.user.name}
  //           //         link={img.links.html}
  //           //         key={img.id}
  //           //       /> 
  // //  this.setState({color: palette.vibrant})
  //             )
            }
          </Palette>
      ))
      // } else {
      //   imgs = <NoImgs />;
      // }
      return (
        <ul className="img-list">
          {imgs}
        </ul>
      );})
    };
   
    

  performSearch = (query = 'sun') => {
 
  }




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
          sendData={this.newPhoto}
          handleSubmit={this.handleSubmit}
          onSearch={this.performSearch}
        />
        {/* <div className="main-content">
          {this.state.loadingState
            ? <p>Loading</p>
            : <ImgList data={this.state.imgs} />}
        </div> */}

        {this.state.displayColorPicker1 ? <div style={popover}>
          <div style={cover} onClick={this.handleClose1} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete1}
          />
        </div> : null}

        {this.state.displayColorPicker2 ? <div style={popover}>
          <div style={cover} onClick={this.handleClose2} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete2} />
        </div> : null}

        {this.state.displayColorPicker3 ? <div style={popover}>
          <div style={cover} onClick={this.handleClose3} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete3} />
        </div> : null}

        {this.state.displayColorPicker4 ? <div style={popover}>
          <div style={cover} onClick={this.handleClose4} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete4} />
        </div> : null}

        {this.state.displayColorPicker5 ? <div style={popover}>
          <div style={cover} onClick={this.handleClose5} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete5} />
        </div> : null}

        <ColorSelectBox
          style1={{ backgroundColor: this.state.color1 }}
          style2={{ backgroundColor: this.state.color2 }}
          style3={{ backgroundColor: this.state.color3 }}
          style4={{ backgroundColor: this.state.color4 }}
          style5={{ backgroundColor: this.state.color5 }}

          clickHandler1={this.handleOpenColorWheel1}
          clickHandler2={this.handleOpenColorWheel2}
          clickHandler3={this.handleOpenColorWheel3}
          clickHandler4={this.handleOpenColorWheel4}
          clickHandler5={this.handleOpenColorWheel5}

        />
        <Img />

        <TopResults results={this.state.results} />
        <AllResults />
        <div className="main-content">
          {this.ImgList()}
        </div>


      </div>
    );
  }
}

export default App;
