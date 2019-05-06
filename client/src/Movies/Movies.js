import React, { Component, Fragment } from 'react';
import Spinner from '../Ui/Spinner';
import Movie from './Movie/Movie';
import axios from '../axios';
import array2string from '../Func/array2string';
//import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import Paging from '../Paging/Paging';
export default class Movies extends Component {
    state = {
        movies: null,
        error: null,
        pageSize: 7,
        pagesCount: 0,
        currentPage: 0,
        addedToWatchlist: null
    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    componentDidMount() {
        axios.get('/shows')
            .then(result => {
                this.setState({ movies: result.data, pagesCount: Math.ceil(result.data.length / this.state.pageSize) })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err });
            })
    }
    addToWatchlist(id) {
        console.log(this.state.movies.indexOf({ id: id }));

    }
    render() {
        let { currentPage } = this.state;
        let movies = this.state.error ? <p>Movies can't be loaded</p> : <Spinner />;

        if (this.state.movies && !this.state.error) {
            movies = this.state.movies.slice(
                currentPage * this.state.pageSize,
                (currentPage + 1) * this.state.pageSize
            ).map(movie => {
                return (
                    <Movie
                        key={movie.id}
                        title={movie.name}
                        imgUrl={movie.image.medium}
                        premiered={movie.premiered}
                        genres={array2string(movie.genres)}
                        status={movie.status}
                        clicked={() => this.props.history.push('/' + movie.id)}
                        addToWatchlist={() => { this.addToWatchlist(movie.id) }} />
                )
            });

        }
        return (
            <Fragment>
                <Paging
                    clicked={(e, i) => this.handleClick(e, i)}
                    currentPage={this.state.currentPage}
                    pagesCount={this.state.pagesCount}
                />

                {/* <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                            onClick={e => this.handleClick(e, currentPage - 1)}
                            previous
                            href="#"
                        />
                    </PaginationItem>

                    {[...Array(this.state.pagesCount)].map((page, i) =>
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= this.state.pagesCount - 1}>
                        <PaginationLink
                            onClick={e => this.handleClick(e, currentPage + 1)}
                            next
                            href="#"
                        />
                    </PaginationItem>

                </Pagination> */}

                {movies}
            </Fragment>
        );
    }
}
