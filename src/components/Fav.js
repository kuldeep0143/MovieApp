import { Component } from "react";
import "./Fav.css";

class Fav extends Component {

  constructor()
  {
    super();
    this.state={
      genres:[],
      currgenre:'All Genres',
      movies:[],
      currText:""
    }
  }


  componentDidMount()
  {
    
    let genresId={
      28: "Action" ,
      12: "Adventure" ,
      16: "Animation" ,
      35: "Comedy" ,
      80: "Crime" ,
      99: "Documentary" ,
      18: "Drama" ,
      10751: "Family" ,
      14: "Fantasy" ,
      36: "History" ,
      27: "Horror" ,
      10402: "Music" ,
      9648: "Mystery" ,
      10749: "Romance" ,
      878: "Science Fiction" ,
      10770: "TV Movie" ,
      53: "Thriller" , 
      10752: "War" ,
      37: "Western" ,
    }
 
    let data= JSON.parse(localStorage.getItem('movies-app')||'[]');
    let tempArr=[];
    tempArr.push("All Genres");
    data.map((movie)=>{
      //Agar temp array me genre id ka wo element present naa ho to
      if(!tempArr.includes(genresId[movie.genre_ids[0]])){
        tempArr.push(genresId[movie.genre_ids[0]]);
      }

    })


    this.setState({
      movies:[...data],
      genres:[...tempArr]
    })
}


  handleChangeGenre=(genre)=>{
    this.setState({
      currgenre:genre,
      currText:''
    },this.filterMovies)
  }

  filterMovies=()=>{
    let data= JSON.parse(localStorage.getItem('movies-app')||'[]');
    let genresId={
      28: "Action" ,
      12: "Adventure" ,
      16: "Animation" ,
      35: "Comedy" ,
      80: "Crime" ,
      99: "Documentary" ,
      18: "Drama" ,
      10751: "Family" ,
      14: "Fantasy" ,
      36: "History" ,
      27: "Horror" ,
      10402: "Music" ,
      9648: "Mystery" ,
      10749: "Romance" ,
      878: "Science Fiction" ,
      10770: "TV Movie" ,
      53: "Thriller" , 
      10752: "War" ,
      37: "Western" ,
    }

    if(this.state.currgenre=='All Genres'){
      
      this.setState({
        movies:[...data],     
      })

    }else{
      
      let filterMovies= data.filter((movie)=>genresId[movie.genre_ids[0]]==this.state.currgenre)
      this.setState({
        movies:[...filterMovies]
      })

    }
    
  }

  handleCurrText=(inputValue)=>{
    this.setState({
      currText:inputValue
    },this.searchMovies)
  }

  searchMovies=()=>{
    
    //Agar value search karna hai same genre me se wo to movies state me hoga but jab value '' ho jaayegi to movies ka value change ho gaya hoga
    //Isse bachne ke liye agar movies "" hoga to filter array genre wise dubara se movies me ussi genre ki movies daal dega
    //Ek aur fayda ki agar searching hamesha same genre me se hogi kyuki movies ki value genre ke hisaab se kar deta hai filterMovies aur 
    //Har baar movies ka state barabar rehta hai 

    this.filterMovies();  
    if(this.state.currText!='')
    {
          let filteredArr= this.state.movies.filter((movieObj)=>{
          let title=movieObj.title.toLowerCase();
          return title.includes(this.state.currText.toLowerCase())
          })
      
          this.setState({
          movies:[...filteredArr]
          })
    }
   
  }

  
  sortPopularityDesc=()=>{
    let temp=this.state.movies.map((movie)=>movie);
    temp.sort((a,b)=>{
      return b.popularity-a.popularity;
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortPopularityAsc=()=>{
    let temp=this.state.movies.map((movie)=>movie);
    temp.sort((a,b)=>{
      return a.popularity-b.popularity;
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortRatingDesc=()=>{
    let temp=this.state.movies.map((movie)=>movie);
    temp.sort((a,b)=>{
      return b.vote_average-a.vote_average;
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortRatingAsc=()=>{
    let temp=this.state.movies.map((movie)=>movie);
    temp.sort((a,b)=>{
      return a.vote_average-b.vote_average;
    })

    this.setState({
      movies:[...temp]
    })
  }

  deleteFavourite=(movieObj)=>{
   
    let data= JSON.parse(localStorage.getItem('movies-app')||'[]');
    let temp=data.filter((movie)=>{ //saari movies do abhi ke movieObj ke id se match nahi karna chahiye
      return movie.id!=movieObj.id;
    })

    this.setState({
      movies:[...temp]//movies ko current movie hata ke update kardo
    })

    localStorage.setItem('movies-app',JSON.stringify(temp));

    let genresId={
      28: "Action" ,
      12: "Adventure" ,
      16: "Animation" ,
      35: "Comedy" ,
      80: "Crime" ,
      99: "Documentary" ,
      18: "Drama" ,
      10751: "Family" ,
      14: "Fantasy" ,
      36: "History" ,
      27: "Horror" ,
      10402: "Music" ,
      9648: "Mystery" ,
      10749: "Romance" ,
      878: "Science Fiction" ,
      10770: "TV Movie" ,
      53: "Thriller" , 
      10752: "War" ,
      37: "Western" ,
    }
 
    let tempArr=[]; //TempArr me ab jitne bhi temp me movies bachi hai unn ki id ko genre se match karke new genre list banao saari genres distinct honge

    //Har baar new genre ki list to banti hai jisme new updated unique genre hai uska array banta hai par hum usse genres array me jab daalenge jab old genre aur new genre me difference aa jaaye 
    
    tempArr.push("All Genres");

    temp.map((movie)=>{
        if(!tempArr.includes(genresId[movie.genre_ids[0]])){
          tempArr.push(genresId[movie.genre_ids[0]]);
        }
    })

    let oldGenreSize=tempArr.length;
    let newGenreSize=this.state.genres.length;
    
    //Agar genres ke size me kuch difference hua hai to Genre ko Starting me kardo
    if(oldGenreSize!=newGenreSize)
    {
      this.handleChangeGenre("All Genres");
      this.setState({
        genres:[...tempArr]
      })
    }
    

    this.filterMovies();

  }


  render() {

    let genresId={
      28: "Action" ,
      12: "Adventure" ,
      16: "Animation" ,
      35: "Comedy" ,
      80: "Crime" ,
      99: "Documentary" ,
      18: "Drama" ,
      10751: "Family" ,
      14: "Fantasy" ,
      36: "History" ,
      27: "Horror" ,
      10402: "Music" ,
      9648: "Mystery" ,
      10749: "Romance" ,
      878: "Science Fiction" ,
      10770: "TV Movie" ,
      53: "Thriller" , 
      10752: "War" ,
      37: "Western" ,
    }



    return (
      
      <div style={{  cursor:"pointer" }} className="container">
        <div className="row">
          <div className="col-3 genre">
            <ul className="list-group">
            
              {
                  this.state.genres.map((genre)=>(
                    this.state.currgenre==genre ? (
                      <li className="list-group-item active">{genre}</li>
                    ):(
                      <li className="list-group-item" onClick={()=>this.handleChangeGenre(genre)}>{genre}</li>
                    )

                ))
              }
            </ul>

          </div>
          <div className="col-9 fav">
            <div className="input-group mb-3">

              <input type="text" className="form-control" placeholder="Search" value={this.state.currText} onChange={(e)=>this.handleCurrText(e.target.value)}/>

            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fa fa-sort-up" onClick={this.sortPopularityDesc}/> Popularity <i class="fa fa-sort-down" onClick={this.sortPopularityAsc}/></th>
                  <th scope="col"><i class="fa fa-sort-up" onClick={this.sortRatingDesc}/> Rating <i class="fa fa-sort-down" onClick={this.sortRatingAsc}/></th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
             
              <tbody>

                {this.state.movies.map((movie) => ( 
                  <tr>
                    <th scope="row"><img style={{width:"6rem",marginRight:"2rem"}} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
                    {movie.title}</th>
                    <td>{genresId[movie.genre_ids[0]]}</td>
                    <td style={{paddingLeft:'2rem'}}>{movie.popularity}</td>
                    <td style={{paddingLeft:'2rem'}}>{movie.vote_average}</td>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={()=>this.deleteFavourite(movie)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            
            </table>

          </div>
        </div>
      </div>
    );
  }
}

export default Fav;
