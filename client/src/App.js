import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import * as $ from 'axios';
import { SketchPicker } from 'react-color';
import Vibrant from 'node-vibrant'
// import Palette from './Palette';
import getImagePalette from './getImagePalette'
import Palette from 'react-palette';
import camelCase from 'lodash/camelCase'

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
      <button type="submit" onClick={props.getPalette}>
        <i className="material-icons icn-search">get palette</i>
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
    <button onClick = {() =>{props.handleSave(props.id)}}>Save</button>
  </li>;

const ImgList = props => {
	const results = props.data;
	let imgs;
	if (results.length > 0) {
		imgs = results.map(img =>
			<Img
      id = {img.id}
      handleSave ={props.saveImage}
      getPalette={props.getPalette}
				url={img.urls.thumb}
				user={img.user.links.html}
				name={img.user.name}
				link={img.links.html}
				key={img.id}
			/>
		);
	} else {
		imgs = <NoImgs />;
	}
	return (
		<ul className="img-list">
			{imgs}
		</ul>
	);
};


const NoImgs = props => (
  <li className='no-imgs'>
    <i className="material-icons icon-img">sentiment_very_dissatisfied</i>
    <h3>No Images match your search.</h3>
  </li>
);



const array = []



class App extends Component {

  state = {
    input: '',
    color: '',
    refinedColor: '',
    displayColorPicker1: false,
    imgs: [],
    results: [],
    searchText: '',
    loadingState: true,
    palette: {},
    loaded: false,
    error: false
  };

//  componentDidMount(){
// this.updatePalette('https://images.unsplash.com/photo-1420207452976-ae61088134b7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjUwNDk2fQ')
//  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ imgs: '' })
    this.performSearch(this.state.refinedColor);
    e.currentTarget.reset();
  };


  handleChange = (event) => {
    this.setState({ input: event.target.value })
  }



  handleChangeComplete1 = (color, event) => {
     this.setState({ color: color.hex });


    const stateColor = this.state.color

    // var base_colors=["660000","990000","cc0000","cc3333","ea4c88","993399","663399","333399","0066cc","0099cc","66cccc","77cc33","669900","336600","666600","999900","cccc33","ffff00","ffcc33","ff9900","ff6600","cc6633","996633","663300","000000","999999","cccccc","ffffff"];
var base_colors= [
  ['#FFBF00', 'Amber' ],
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
  ['#800020', 'Burgundy'],
  ['#007BA7', 'Cerulean'],		
  ['#7FFF00', 'Chartreuse'],	
  ['#7B3F00', 'Chocolate'],	
  ['#0047AB', 'Cobalt blue'],		
  ['#B87333', 'Copper'],	
  ['#DC143C', 'Crimson'],
  ['#00FFFF', 'Cyan'],	
  ['#7DF9FF', 'Electric blue'],	
  ['#50C878', 'Emerald'],
  ['#228B22', 'Forest green'],	
  ['#FFD700', 'Golden'],	
  ['#808080', 'Gray'],	
  ['#008000', 'Green'],
  ['#FC0FC0', 'Hot pink'],		
  ['#4B0082', 'Indigo'],	
  ['#FFFFF0', 'Ivory'],
  ['#00A86B', 'Jade'],
  ['#29AB87', 'Jungle green'],	
  ['#B57EDC', 'Lavender'],		
  ['#C8A2C8', 'Lilac'],	
  ['#BFFF00', 'Lime green'],
  ['#FF00FF', 'Magenta'],
  ['#800000', 'Maroon'],	
  ['#E0B0FF', 'Mauve'],
  ['#000080', 'Navy blue'],
  ['#808000', 'Olive green'],
  ['#FF6600', 'Orange'],
  ['#FF4500', 'Orange-red'],
  ['#CCCCFF', 'Periwinkle'],
  ['#1C39BB', 'light blue'],
  ['#FD6C9E', 'Pink'],
  ['#8E4585', 'Plum purple'],	
  ['#800080', 'Purple'],
  ['#E30B5C', 'Raspberry'],
  ['#FF0000', 'Red'],		
  ['#FF007F', 'Rose'],
  ['#084C9E', 'Royal blue'],
  ['#E0115F', 'Ruby'],
  ['#FA8072', 'Light pink'],		
  ['#0F52BA', 'Sapphire blue'],
  ['#FF2400', 'Scarlet red'],
  ['#C0C0C0', 'Silver gray'],
  ['#708090', 'Slate gray'],	
  ['#00FF7F', 'Light green'],	
  ['#D2B48C', 'Light brown'],	
  ['#483C32', 'Taupe'],	
  ['#008080', 'Teal'],
  ['#40E0D0', 'Turquoise'],		
  ['#8F00FF', 'Violet'],
  ['#F5DEB3', 'Wheat'],		
  ['#FFFFFF', 'White'],	
  ['#FFFF00', 'Yellow']
  ]
    //Convert to RGB, then R, G, B
    var color_rgb = hex2rgb(stateColor)
    var color_r = color_rgb.split(',')[0];
    var color_g = color_rgb.split(',')[1];
    var color_b = color_rgb.split(',')[2];

    //Create an emtyp array for the difference betwwen the colors
    var differenceArray=[];

    //Function to find the smallest value in an array
    Array.min = function( array ){
           return Math.min.apply( Math, array );
    };


    //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
    base_colors.forEach(function(value, index) {
      var base_color_rgb = hex2rgb(value[0]);
      var base_colors_r = base_color_rgb.split(',')[0];
      var base_colors_g = base_color_rgb.split(',')[1];
      var base_colors_b = base_color_rgb.split(',')[2];

      //Add the difference to the differenceArray
      differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
   
  });

    //Get the lowest number from the differenceArray
    var lowest = Array.min(differenceArray);
   

    //Get the index for that lowest number
    var index = differenceArray.indexOf(lowest);

    //Function to convert HEX to RGB
    function hex2rgb( color) {
   

        var r,g,b;
        if ( color.charAt(0) === '#' ) {
            color = color.substr(1);
        }

        r = color.charAt(0) + color.charAt(1);
        g = color.charAt(2) + color.charAt(3);
        b = color.charAt(4) + color.charAt(5);

        r = parseInt( r,16 );
        g = parseInt( g,16 );
        b = parseInt( b ,16);
        return r+','+g+','+b;
    }

    //Return the HEX code
    console.log(base_colors[index][1])
    this.setState({refinedColor: base_colors[index][1]})
    // return base_colors[index][1];
   
   
  };

  
  handleOpenColorWheel1 = () => {
    this.setState({ displayColorPicker1: !this.state.displayColorPicker1 })
  };

  handleClose1 = () => {
    this.setState({ displayColorPicker1: false })
  };

 
   getImagePalette2 = (url) => {
    //  const imgUrl = this.state.imgs[0].urls.full
    return Vibrant.from(url).getPalette()
      .then(response => {
        const keys = Object.keys(response);
        console.log(response)
        const addPalette = (acc, paletteName) => ({
          ...acc,
          [camelCase(paletteName)]: response[paletteName] && response[paletteName].getHex()
        })
        const colorPallete = keys.reduce(addPalette, {})
  
        return colorPallete
      })
    }

  getImagePalette = () => {
    
    this.state.imgs.map(image => (
    
      Vibrant.from(image).getPalette((err, palette) => console.log(palette))

    ))
   
      // 'use strict';
      // console.log(this.state.imgs[0])
  
      // var img = this.state.imgs[0],
      //     list = document.querySelector('ul'),
      //     section = document.querySelector('section'),
      //     paletteReady = false;
      //     console.log(img)
          
      // // img.addEventListener('load', function() {
      // //     if ( !paletteReady )
      // //         getPalette();
      // // });
      
      // if (!paletteReady)
      //     getPalette();
      
      // function getPalette() {
      //     paletteReady = true;
     
      //     var vibrant = Vibrant.result
      //     debugger
      //          var swatches = vibrant.swatches(),
      //         listFragment = new DocumentFragment();
      //         console.log(vibrant)
      //     for ( var swatch in swatches ) {
      //         if (swatches.hasOwnProperty(swatch) && swatches[swatch]) { 
      //             console.log(swatch, swatches[swatch].getHex());
      //             var li = document.createElement('li'),
      //                 p = document.createElement('p'),
      //                 small = document.createElement('small');
                  
      //             p.textContent = swatches[swatch].getHex();
      //             p.style.color = swatches[swatch].getTitleTextColor();
      //             small.textContent = swatch;
      //             small.style.color = swatches[swatch].getBodyTextColor();
      //             li.style.backgroundColor = swatches[swatch].getHex();
      //             li.appendChild(p);
      //             li.appendChild(small);
      //             listFragment.appendChild(li);
      //         }
      //     }
          
      //     list.appendChild(listFragment);
          
      //     if (swatches['DarkVibrant']) {
      //         section.style.backgroundColor = swatches['DarkVibrant'].getHex();
      //     }
      // }
  } ;

  // getImagePalette = (img) =>{
  //   console.log(img)

  //   return Vibrant.from(img).getPalette()
  //     .then(response => {
  //       const keys = Object.keys(response);
  //       const addPalette = (acc, paletteName) => ({
  //         ...acc,
  //         [camelCase(paletteName)]: response[paletteName] && response[paletteName].getHex()
  //       })
  //       const colorPallete = keys.reduce(addPalette, {})
  
  //       return colorPallete
  //     })
  // }

  // getPalette = () => {
  //   describe('<Palette />', () => {
  //     const image = 'default'
    
  //     describe('shallow', () => {
  //       it('should not call the children when loaded=false', () => {
  //         const wrapper = shallow(
  //           <Palette image={image} />
  //         )
    
  //         expect(wrapper.state('loaded')).toBeFalsy();
  //         expect(wrapper.children()).toHaveLength(0)
  //       })
  //     })
    
  //     describe('mount', () => {
  //       const children = jest.fn((palette) => <div />)
  //       const wrapper = mount(
  //         <Palette image={image}>
  //           {children}
  //         </Palette>
  //       )
    
  //       it('calls getImagePalette with the image prop', async () => {
  //         await expect(getImagePalette).toBeCalledWith(image)
  //       })
    
  //       it('calls the children with the palette', async () => {
  //         await expect(children).toBeCalledWith(palettes.default)
  //       })
    
  //       it('renders the children', async () => {
  //         await expect(wrapper.contains(<div />)).toEqual(true)
  //       })
    
  //       it('updates the palette when the image change', async () => {
  //         const newImage = 'secondary'
    
  //         wrapper.setProps({ image: newImage})
    
  //         await expect(getImagePalette).toBeCalledWith(newImage)
  //         await expect(children).toBeCalledWith(palettes.secondary)
  //       })
  //     });
  //   })
  // }
  
  



	performSearch = (query = this.state.refinedColor) => {
		$
			.get(
				`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`
			)
			.then(data => {
        console.log(data)
				this.setState({ imgs: data.data.results, loadingState: false });
			})
			.catch(err => {
				console.log('Error happened during fetching!', err);
			});
	};
    
  savePhoto = (id) => {
    const image = this.state.imgs.find((elem)=>elem.id === id)
    const saveImage = {
      id: image.id,
    color: image.color,
    height: image.height,
    width: image.width,
    likes: image.likes
    }
    $
    .post(`/api/matchingPic/`, {data: saveImage})
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
    
    const { children } = this.props
    const { palette, loaded } = this.state

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
          getPalette={this.getImagePalette}
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
            handleHex={this.getSimilarColors}
          />
        </div> : null}
 {/* {this.getImagePalette("https://images.unsplash.com/photo-1420207452976-ae61088134b7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjUwNDk2fQ")} */}
       
        <ColorSelectBox
          style1={{ backgroundColor: this.state.color }}
          clickHandler1={this.handleOpenColorWheel1}
        />
        <Img />

        <TopResults results={this.state.results} />
        <AllResults />
        <div className="main-content">
					{this.state.loadingState
						? <p>Loading</p>
						: <ImgList saveImage={this.savePhoto} data={this.state.imgs} 
            />}
				</div>

      </div>
      
    );
    
  }
  
}

export default App;
