import React, { Component } from 'react';
import './App.css';
import * as $ from 'axios';
import { SketchPicker } from 'react-color';
import logo from './assets/rainbowM.jpg'
import Palette from 'react-palette';



const Header = (props) => (
  <div className='header'>
    <div className ='logo-container'>
      <div className='header-logo'>
        <h3 className='headertext chro'>chro</h3> <img className='rainbowM' src={logo} /><h3 className='headertext atch'>atch</h3>
      </div>
    </div>

    <div className='slide-container'>
      <ImgListSlide data={props.data} />
    </div>


  </div>
)



const ImgSlide = (props) =>

  <li className='slidepics'>
    <div className='slide-box'>
      <a href={props.link}>
        <img className='slideshowimage' crossOrigin="Anonymous" src={props.url} alt="Unsplash Image here" />
      </a>
    </div>
  </li>;

const ImgListSlide = props => {
  const results = props.data;
  let imgs;
  if (results.length > 0) {
    imgs = results.map(img =>
      <ImgSlide
        id={img.id}
        url={img.urls.thumb}
        user={img.user.links.html}
        name={img.user.name}
        link={img.links.html}
        key={img.id}
      />
    );
  }
  return (
    <div className='slidelist'>
      <ul className="slide-img-list" >
        {imgs}
      </ul>
    </div>

  );
};




const ColorSelectBox = (props) => (
  <div className='bigBox main'>
  <div className ='colorbox text'>Pick a color!</div>
    
    <div>
      <div className='color-box one' style={props.style1} onClick={props.clickHandler1} >
      </div>
    </div>
    <div>
      <form className="search-form" onSubmit={props.handleSubmit}>

        <button type="submit" id="submit" className="search-button">
          <i className="material-icons icn-search">search</i>
        </button>
      </form>
    </div>
  </div>
)


const Img = (props) =>
  <li className='image-container'>
    <div className='image-size'>
      <a href={props.link}>
        <img className='image' crossOrigin="Anonymous" src={props.url} alt="Unsplash Image here" />
      </a>
    </div>

    <div className="palette vibrant colors">{props.palettes}</div>


    <button onClick={() => { props.handleSave(props.id) }}>Save</button>
  </li>;

const generatePalettes = (img) => (

  <Palette image={img && img.urls && img.urls.small}>
    {palette => (
      <div className='palette element'>
        <div>
          <div className='palette darkVibrant box' style={{ backgroundColor: palette.darkVibrant }}>
          <span class="hexText">{palette.darkVibrant}</span>
          </div>
          <p className='palette name'>#DarkVibrant</p>
        </div>

        <div>
          <div className='palette lightVibrant box' style={{ backgroundColor: palette.lightVibrant }}>
          <span class="hexText">{palette.lightVibrant}</span>
          </div>
          <p className='palette name'>#LightVibrant</p>
        </div>

        <div className=''>
          <div className='palette Vibrant box' display='inline-block' style={{ backgroundColor: palette.vibrant }}>
          <span class="hexText">{palette.vibrant}</span>
          </div>
          <p className='palette name'>#Vibrant</p>

        </div>

        <div>
          <div className='palette muted box' style={{ backgroundColor: palette.muted }}>
          <span class="hexText">{palette.muted}</span>
          </div>
          <p className='palette name'>#Muted</p>
        </div>

        <div>
          <div className='palette lightMuted box' style={{ backgroundColor: palette.lightMuted }}>
          <span class="hexText">{palette.lightMuted}</span>
          </div>
          <p className='palette name'>#LightMuted</p>
        </div>

        <div>
          <div className='palette darkMuted box' style={{ backgroundColor: palette.darkMuted }}>
          <span class="hexText">{palette.darkMuted}</span>
          </div>
          <p className='palette name'>#DarkMuted</p>
        </div>

      </div>
    )}
  </Palette>
);


const ImgList = props => {
  const results = props.data;
  let imgs;
  if (results.length > 0) {
    imgs = results.map(img =>
      <Img
        palettes={generatePalettes(img)}
        id={img.id}
        handleSave={props.saveImage}
        url={img.urls.thumb}
        user={img.user.links.html}
        name={img.user.name}
        link={img.links.html}
        key={img.id}
      />
    );
  }
  return (
    <div>
      <div className='list-container'>
        <ul className="img-list" >

          {imgs}
          {/* <NextPrev style = {props.style} nextPage={props.nextPage} prevPage={props.prevPage} /> */}
        </ul>
      </div>
    </div>
  );
};


class App extends Component {

  state = {
    color: '#fff',
    input: '',
    refinedColor: '',
    page: '',
    slidePage: (Math.floor(Math.round(Math.random() * 100) + 1)),
    displayColorPicker1: false,
    imgs: [],
    slideshowImgs: [],
    loadingState: true,
    navbuttons: true,
    loaded: false,
    error: false
  };

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({imgs: [], page: 1})
    this.performSearch(this.state.refinedColor, this.state.page);
    e.currentTarget.reset();
  };


  handleChange = (event) => {
    this.setState({ input: event.target.value })
  }


  handleChangeComplete1 = (color, event) => {
    this.setState({ color: color.hex });


    const stateColor = this.state.color

    var base_colors = [
      ['#FFBF00', 'Amber'],
      ['#9966CC', 'Amethyst'],
      ['#7FFFD4', 'Aquamarine'],
      ['#007FFF', 'Azure'],
      ['#89CFF0', 'Baby blue'],
      ['#F5F5DC', 'Beige'],
      ['#000000', 'Black'],
      ['#0000FF', 'Blue'],
      ['#0095B6', 'Blue-green'],
      ['#8A2BE2', 'Blue-violet'],
      ['#CD7F32', 'Bronze'],
      ['#964B00', 'Brown'],
      ['#AE5E0F', 'Burnt Orange'],
      ['#800020', 'Burgundy'],
      ['#007BA7', 'Cerulean'],
      ['#7B3F00', 'Chocolate'],
      ['#0047AB', 'Cobalt blue'],
      ['#B87333', 'Copper'],
      ['#DC143C', 'Crimson'],
      ['#A93636', 'Crimson'],
      ['#00FFFF', 'Cyan'],
      ['#46423C', 'Dark grey'],
      ['#3F5739', 'Dark green'],
      ['#7DF9FF', 'Electric blue'],
      ['#50C878', 'Emerald'],
      ['#228B22', 'Dark green'],
      ['#FFD700', 'Golden'],
      ['#808080', 'Gray'],
      ['#008000', 'Green'],
      ['#FC0FC0', 'Hot pink'],
      ['#4B0082', 'Indigo'],
      ['#FFFFF0', 'Ivory'],
      ['#00A86B', 'Jade'],
      ['#29AB87', 'Jungle green'],
      ['#CBA47D', 'Khaki'],
      ['#B57EDC', 'Mauve'],
      ['#C8A2C8', 'Lilac'],
      ['#BFFF00', 'Lime green'],
      ['#E1BCBC', 'Light Pink'],
      ['#F4B0B0', 'Light Pink'],
      ['#F2AA51', 'Light orange'],
      ['#FF00FF', 'Magenta'],
      ['#800000', 'Maroon'],
      ['#E0B0FF', 'Mauve'],
      ['#B99090', 'Mauve'],
      ['#000080', 'Navy blue'],
      ['#808000', 'Olive green'],
      ['#FF6600', 'Orange'],
      ['#E39F18', 'Orange'],
      ['#ED6D30', 'Orange'],
      ['#FF4500', 'Orange-red'],
      ['#CCCCFF', 'Periwinkle'],
      ['#1C39BB', 'light blue'],
      ['#678B42', 'Pea green'],
      ['#FD6C9E', 'Pink'],
      ['#9F25AE', 'Purple'],
      ['#800080', 'Purple'],
      ['#E30B5C', 'Raspberry'],
      ['#FF0000', 'Red'],
      ['#FF007F', 'Rose'],
      ['#084C9E', 'Royal blue'],
      ['#E0115F', 'Ruby'],
      ['#FA8072', 'Light pink'],
      ['#0F52BA', 'Sapphire blue'],
      ['#2CBCB2', 'Seafoam'],
      ['#FF2400', 'Scarlet red'],
      ['#C0C0C0', 'Silver gray'],
      ['#708090', 'Slate gray'],
      ['#00FF7F', 'Light green'],
      ['#D2B48C', 'Light brown'],
      ['#483C32', 'Black'],
      ['#008080', 'Teal'],
      ['#40E0D0', 'Turquoise'],
      ['#8F00FF', 'Violet'],
      ['#F5DEB3', 'Wheat'],
      ['#FFFFFF', 'White'],
      ['#F7ECEC', 'White'],
      ['#FFFF00', 'Yellow'],
      ['#C3E61C', 'Yellow']
    ]
    //Convert to RGB, then R, G, B
    var color_rgb = hex2rgb(stateColor)
    var color_r = color_rgb.split(',')[0];
    var color_g = color_rgb.split(',')[1];
    var color_b = color_rgb.split(',')[2];

    //Create an emtyp array for the difference betwwen the colors
    var differenceArray = [];

    //Function to find the smallest value in an array
    Array.min = function (array) {
      return Math.min.apply(Math, array);
    };


    //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
    base_colors.forEach(function (value, index) {
      var base_color_rgb = hex2rgb(value[0]);
      var base_colors_r = base_color_rgb.split(',')[0];
      var base_colors_g = base_color_rgb.split(',')[1];
      var base_colors_b = base_color_rgb.split(',')[2];

      //Add the difference to the differenceArray
      differenceArray.push(Math.sqrt((color_r - base_colors_r) * (color_r - base_colors_r) + (color_g - base_colors_g) * (color_g - base_colors_g) + (color_b - base_colors_b) * (color_b - base_colors_b)));

    });

    //Get the lowest number from the differenceArray
    var lowest = Array.min(differenceArray);


    //Get the index for that lowest number
    var index = differenceArray.indexOf(lowest);

    //Function to convert HEX to RGB
    function hex2rgb(color) {


      var r, g, b;
      if (color.charAt(0) === '#') {
        color = color.substr(1);
      }

      r = color.charAt(0) + color.charAt(1);
      g = color.charAt(2) + color.charAt(3);
      b = color.charAt(4) + color.charAt(5);

      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
      return r + ',' + g + ',' + b;
    }

    //Return the HEX code
    console.log(base_colors[index][1])
    this.setState({ refinedColor: base_colors[index][1] })
    // return base_colors[index][1];
  };


  handleOpenColorWheel1 = () => {
    this.setState({ displayColorPicker1: !this.state.displayColorPicker1 })
  };

  handleClose1 = () => {
    this.setState({ displayColorPicker1: false, page: 0 })

  };

  componentWillMount(page= this.state.slidePage) {
    $.get(
      `https://api.unsplash.com/search/photos/?page=${page}&per_page=10&query=wallpapers&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`
    )
      .then(data => {
        console.log(data)
        this.setState({ slideshowImgs: data.data.results, loadingState: false });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  }

  async componentDidMount() {
    const imgs = await $.post("/unsplash", { query: this.state.refinedColor });
    this.nextPage()
    this.setState({ imgs: imgs.data.results });

  }

  nextPage = (query, page) => {
    this.setState({ page: this.state.page + 1, query: this.state.refinedColor}, this.performSearch(query, page))
  }
  prevPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1, query: this.state.refinedColor}, this.performSearch)
    }
  }

  performSearch = (query = this.state.refinedColor, page = this.state.page) => {
    $
      .get(
        `https://api.unsplash.com/search/photos/?page=${page}&per_page=10&query=${query}&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`
      )
      .then(data => {
        console.log(data)
        this.setState({ imgs: data.data.results, loadingState: false, navbuttons: false  });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  };



  savePhoto = (id) => {
    const image = this.state.imgs.find((elem) => elem.id === id)
    const saveImage = {
      id: image.id,
      color: image.color,
      height: image.height,
      width: image.width,
      likes: image.likes
    }
    $
      .post(`/api/matchingPic/`, { data: saveImage })
  }

  slideshowSearch = (query = 'wallpapers', page = this.state.slidePage) => {
    $
      .get(
        `https://api.unsplash.com/search/photos/?page=${page}&per_page=10&query=${query}&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`

      )
      .then(data => {
        console.log(data)
        this.setState({ slideshowImgs: data.data.results, loadingState: false, });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  };



  render() {
    const popover = {
      position: 'fixed',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    var className = this.state.navbuttons ? 'hidden' : 'visible';
    

    return (

      <div>
        <Header data={this.state.slideshowImgs} />



        {this.state.displayColorPicker1 ? <div className="sketch-pop" style={popover}>
          <div style={cover} onClick={this.handleClose1} />
          <SketchPicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete1}
            handleHex={this.getSimilarColors}
          />
        </div> : null}

        <ColorSelectBox
          style1={{ backgroundColor: this.state.color }}
          clickHandler1={this.handleOpenColorWheel1}
          value={this.state.searchVal}
          changeHandler={this.handleChange}
          findPhotos={this.handleResults}
          sendData={this.newPhoto}
          handleSubmit={this.handleSubmit}
          onSearch={this.performSearch}
          getPalette={this.slideshowSearch}
        />
        <div className="main-content">
          {this.state.loadingState
            ? <p></p>
            : <ImgList
              saveImage={this.savePhoto}
              data={this.state.imgs}
              nextPage={this.nextPage}
              prevPage={this.prevPage}
            /> } <div className='list-container' >
            <div className ='button-container'>
            <div><button onClick={this.prevPage} className={className}>Previous Page</button></div>
            <div><button className={className} onClick={this.nextPage}>Next Page</button></div>
            </div>
            
          </div>
        
        </div> 

      </div>

    );
  }
}

export default App;
