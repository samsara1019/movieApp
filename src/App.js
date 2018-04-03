import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';



class App extends Component {
  
  state = {
  }

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi(); //callApi기능이 끝나는 것을 기다리고 return값을 movies에 저장
    this.setState({ //callApi 작업이 완료되기 전까지는 실행되지 않음
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response =>  response.json()) //fetch를 실행한 뒤 결과물, json형태로 바꿔준다
    .then(json => json.data.movies)
    .catch(err => console.log(err)) //에러가 발생하면 잡아줌
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App-loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }

}

export default App;






