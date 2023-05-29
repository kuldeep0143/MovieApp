import { Component } from "react";
// import {movies} from "../moviedata";
import axios from "axios";

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      pageArr: [1],
      movies: [],
      currPage: 1,
      favourites:[]
    };
  }

  async componentDidMount() {
    console.log("mount");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=8b441c93ffc0e4ad001b50874f633591&language=en-US&page=${this.state.currPage} `
    );
    // console.log(response.data);
    this.setState({
      movies: [...response.data.results],
    });
  }

  changeMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=8b441c93ffc0e4ad001b50874f633591&language=en-US&page=${this.state.currPage} `
    );
    console.log(response.data);
    this.setState({
      movies: [...response.data.results],
    });
  };

  handleNext = () => {
    this.setState(
      {
        pageArr: [...this.state.pageArr, this.state.pageArr.length + 1],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handlePrev = () => {

    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        }, this.changeMovies);
    }
  };


  handlePageClick = (page) => {
    if (page != this.state.currPage) {
      this.setState({
        currPage: page
      }, this.changeMovies);
    }
  }
 
  handleFav=(movieObj)=>{
    let oldData=JSON.parse( localStorage.getItem('movies-app') || '[]');

    if(this.state.favourites.includes(movieObj.id))
    {
      oldData=oldData.filter((movie)=>movie.id!=movieObj.id); 
      //If movie present already
    }else{
      oldData.push(movieObj); 
      //If movie not present
    }

    localStorage.setItem('movies-app',JSON.stringify(oldData));
    this.handleFavState();
  }

  handleFavState=()=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app')||'[]');
    let temp=oldData.map((movie)=>movie.id)
    this.setState({
      favourites:[...temp]
    })

  }

  render() {
    console.log("rendered");
    return (
      <>
        <div>
          <h1 className="text-center">Trending</h1>
        </div>

        <div className="movies-wrapper">
          {this.state.movies.map((movie) => (
            <>
              <div
                className="card movie-board"
                onMouseEnter={() => this.setState({ hover: movie.id })}
                onMouseLeave={() => this.setState({ hover: "" })}
              >
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt="Card image cap"
                />
                <h5 className="card-title movie-title">
                  {movie.original_title}
                </h5>
                <div className="movie-button">
                  {this.state.hover == movie.id && (
                    <a className="btn btn-primary" onClick={()=>this.handleFav(movie)}>
                      {this.state.favourites.includes(movie.id)?"Remove from Favourites":"Add to Favourites" }
                    
                  </a>)}
                </div>
              </div>
            </>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" , cursor:"pointer" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handlePrev}>
                  Previous
                </a>
              </li>

              {this.state.pageArr.map((page) => (
                <li className="page-item">
                  <a className="page-link" href="#" onClick={() => this.handlePageClick(page)}>
                    {page}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" onClick={this.handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default MovieList;
