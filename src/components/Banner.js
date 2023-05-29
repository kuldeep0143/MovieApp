import axios from "axios";
import { Component } from "react";

class Banner extends Component{

    constructor()
    {
        super();
        this.state={
            movie:""
        }
    }

    async componentDidMount()
    {
        let response= await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=8b441c93ffc0e4ad001b50874f633591");
        // console.log(response.data);
        this.setState({
            movie:response.data.results[0]
        })
    }


    render(){ 
        let backdropPath=this.state.movie.backdrop_path;

        return(
            <div className="card banner-wrapper">
              <img className="card-img-top banner-image" src={`https://image.tmdb.org/t/p/original${backdropPath}`} alt="Card image cap"/>
              <div className="banner">
              <h1 className="card-title">{this.state.movie.original_title}</h1>
              <p className="card-text">{this.state.movie.overview}</p>

              </div>
              
          </div>
        )
    }
}

export default Banner;