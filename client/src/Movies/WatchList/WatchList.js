import React, { Component, Fragment } from 'react';
import Movie from '../Movie/Movie';
import axios from '../../axios';
import array2string from '../../Func/array2string';

export default class WatchList extends Component {
    state = {
        movies: null,
        error: null,
        watchList: []
    }
    componentDidMount() {
        console.log('didmount fired');
        this.loadDataFromServer();
    }
    loadDataFromServer = () => {
        axios.get('http://localhost:3000/watchlist')
            .then(result => {
                this.setState({ watchList: result.data });
            })
            .then(() => {
                this.populateMovies(this.state.watchList);
            })
            .catch(err => {
                console.log(err); this.setState({ error: err });
            })

    }
    populateMovies(idArr) {
        const tempArr = [];
        idArr.forEach((id, index) => {
            axios.get('/shows/' + id)
                .then(movie => {
                    //console.log('movie from TVMaze',movie.data);

                    tempArr.push(movie.data);
                    //console.log('tempArr',tempArr);
                })
                .then(() => {
                    if (index === idArr.length - 1) {
                        this.setState({ movies: tempArr })
                        this.forceUpdate();
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: err });
                })
        })

    }
    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }
    changeHandler(event) {
        this.setState({ query: event.target.value })
    }

    searchhandler() {
        if (this.state.query) {
            this.setState({ searchFlag: true });
            axios.get('/search/shows?q=' + this.state.query)
                .then(result => {
                    this.setState({ movies: result.data });
                }).catch(err => {
                    console.log(err); this.setState({ error: err });
                })
        }
    }
    removeFromWatchlist(e, id) {
        e.preventDefault();
        axios.delete('http://localhost:3000/watchlist', { data: { "id": id } })
        console.log(id);
        this.loadDataFromServer();
    }
    render() {
        let { currentPage } = this.state;
        let movies = <p>No movies in your WatchList</p>
        if (this.state.movies && !this.state.error) {

            movies = this.state.movies.map(mov => {
                const movie = mov.show ? Object.assign({}, mov.show) : Object.assign({}, mov);
                return (
                    <Movie
                        key={movie.id}
                        title={movie.name}
                        imgUrl={movie.image ? movie.image.medium : 'https://www.classicposters.com/images/nopicture.gif'}
                        premiered={movie.premiered}
                        genres={movie.genres || movie.genres.length < 1 ? array2string(movie.genres) : 'Genre not defined'}
                        status={movie.status}
                        clicked={() => this.props.history.push('/' + movie.id)}
                        btnAction={(e) => this.removeFromWatchlist(e, movie.id)}
                        btnLabel={"Remove from Watchlist"}
                    />
                )
            });
        }

        return (

            movies


        );
    }
}