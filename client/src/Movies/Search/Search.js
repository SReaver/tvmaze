import React, { Component, Fragment } from 'react';
import Spinner from '../../Ui/Spinner';
import Movie from '../Movie/Movie';
import axios from '../../axios';
import array2string from '../../Func/array2string';
import Paging from '../../Paging/Paging';
// import { Button } from 'reactstrap';
export default class Search extends Component {
    state = {
        movies: null,
        error: null,
        query: '',
        searchResult: null,
        searchFlag: true,
        pageSize: 7,
        pagesCount: 0,
        currentPage: 0
    }
    componentDidMount() {
        if (this.state.searchFlag) {
            //console.log('DidUpdate Fired!');

            axios.get('/shows')
                .then(result => {
                    this.setState({ movies: result.data, searchFlag: false, pagesCount: Math.ceil(result.data.length / this.state.pageSize) });
                }).catch(err => {
                    console.log(err); this.setState({ error: err });
                })
        }
    }
    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }
    changeHandler(event) {
        //console.log(event.target.value);
        this.setState({ query: event.target.value })
    }
    // handleSubmit(event) {
    //     event.preventDefault();
    //     //alert('A name was submitted: ' + this.state.value);
    // }

    searchhandler() {
        //event.preventDefault();
        //console.log(this);
        if (this.state.query) {
            this.setState({ searchFlag: true });
            axios.get('/search/shows?q=' + this.state.query)
                .then(result => {
                    //console.log(result.data);
                    // console.log('State movies before', this.state.movies);
                    this.setState({ movies: result.data, pagesCount: Math.ceil(result.data.length / this.state.pageSize), currentPage: 0 });
                    //console.log('State movies after', this.state.movies);
                }).catch(err => {
                    console.log(err); this.setState({ error: err });
                })
        }
    }
    addToWatchlist(e, id) {
        e.preventDefault();
        axios.put('http://localhost:3000/watchlist', { "id": id })
        console.log(id);

    }
    render() {
        let { currentPage } = this.state;
        let movies = this.state.error ? <p>Movies can't be loaded</p> : <Spinner />;
        if (this.state.movies && !this.state.error) {
            //movies = this.state.movies.map(mov => {
            movies = this.state.movies.slice(
                currentPage * this.state.pageSize,
                (currentPage + 1) * this.state.pageSize
            ).map(mov => {
                const movie = mov.show ? Object.assign({}, mov.show) : Object.assign({}, mov);
                // console.log(movie);

                return (
                    <Movie
                        key={movie.id}
                        title={movie.name}
                        imgUrl={movie.image ? movie.image.medium : 'https://www.classicposters.com/images/nopicture.gif'}
                        premiered={movie.premiered}
                        genres={movie.genres.length < 1 ? array2string(movie.genres) : 'Genre not defined'}
                        status={movie.status}
                        clicked={() => this.props.history.push('/' + movie.id)}
                        btnAction={(e) => this.addToWatchlist(e, movie.id)}
                        btnLabel={"Add to Watchlist"}  />
                )
            });
        } else if (this.state.query) {
            movies = <p>Sorry, {this.state.query} was not found in our library.</p>
        }
        return (
            <Fragment>
                <div>
                    <form onSubmit={(e) => { this.searchhandler(); e.preventDefault(); }}>
                        <input
                            type="text"
                            value={this.state.query}
                            placeholder="Type a movie.."
                            onChange={event => this.changeHandler(event)} />
                        {/* <Button color="primary" onClick={() => { this.searchhandler() }}>Search</Button> */}
                        <input type="submit" value="Search" />
                    </form>
                    <Paging
                        clicked={(e, i) => this.handleClick(e, i)}
                        currentPage={this.state.currentPage}
                        pagesCount={this.state.pagesCount}
                    />
                </div>

                {movies}
            </Fragment>
        );
    }
}