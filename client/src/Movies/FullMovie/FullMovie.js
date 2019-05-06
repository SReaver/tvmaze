import React, { Component, Fragment } from 'react';
import axios from '../../axios';
import Spinner from '../../Ui/Spinner';
import Cast from '../../Cast/Cast';
import array2string from '../../Func/array2string';

import './FullMovie.scss';

class FullMovie extends Component {
    state = {
        loadedMovie: null,
        loadedMovieCast: null,
        error: null
    }
    componentDidMount() {

        axios.get('/shows/' + this.props.match.params.id)
            .then(response => {
                //console.log('componentDidUpdate response', response);
                this.setState({ loadedMovie: response.data });
                //console.log(this.state.loadedMovie);

            })
            .then(
                axios.get('/shows/' + this.props.match.params.id + '/cast')
                    .then(res => {
                        this.setState({ loadedMovieCast: res.data })
                        //console.log('CAST', this.state.loadedMovieCast);

                    })
                    .catch(err => {
                        this.setState({ error: err })
                    })
            )
            .catch(err => {
                this.setState({ error: err })
            });
    }


    render() {
        //let movie = <p style={{ textAlign: 'center' }}>Please select a Movie!</p>;
        let movie = this.state.error ? <p>Movie can't be loaded</p> : <Spinner />;
        if (this.state.loadedMovie) {
            movie = (
                <Fragment>
                    <div className="FullMovie">
                        <div className="Poster">
                            {/* {this.state.loadedMovie.image? this.state.loadedMovie.image.medium : 'https://www.classicposters.com/images/nopicture.gif'} */}
                            <img src={this.state.loadedMovie.image ? this.state.loadedMovie.image.original : 'https://www.classicposters.com/images/nopicture.gif'} alt={this.state.loadedMovie.name} />
                        </div>
                        <div className="Description">
                            <h1>{this.state.loadedMovie.name}</h1>
                            <p>Premiered: {this.state.loadedMovie.premiered}</p>
                            <p>Rating: {this.state.loadedMovie.rating.average}</p>
                            <p>Genre: {array2string(this.state.loadedMovie.genres)}</p>
                            <p>Status: {this.state.loadedMovie.status}</p>
                            <p>Official site: <a href={this.state.loadedMovie.officialSite}>{this.state.loadedMovie.name}</a></p>
                            <p>Schedule: {array2string(this.state.loadedMovie.schedule.days)} {this.state.loadedMovie.schedule.time} </p>
                            <div>Summary: {this.state.loadedMovie.summary ? this.state.loadedMovie.summary.replace(/<p>|<\/p>|<b>|<\/b>|<i>|<\/i>/igm, '') : "No summary"}</div>

                        </div>
                    </div>
                    <div className="Cast">
                        <Cast
                            id={this.state.loadedMovie.id}
                        />
                    </div>
                </Fragment>
            );
        }
        return movie;
    }
}

export default FullMovie;