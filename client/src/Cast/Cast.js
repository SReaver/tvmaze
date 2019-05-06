import React, { Component } from 'react';
import Spinner from '../Ui/Spinner';
import axios from '../axios';
import Character from './Character';
import './Cast.scss'

export default class Movies extends Component {
    state = {
        cast: null,
        error: null
    }
    componentDidMount() {
        axios.get('/shows/' + this.props.id + '/cast')
            .then(res => {
                this.setState({ cast: res.data });
                //console.log(this.state.cast);
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }

    render() {
        let castDisplay = this.state.error ? <p>Cast can't be loaded</p> : <Spinner />;
        if (this.state.cast && !this.state.error) {
            //console.log(this.state.movies);
            castDisplay = this.state.cast.map(character => {
                return (
                    <Character
                        key={character.character.id}
                        personName={character.person.name}
                        characterName={character.character.name}
                        imgUrl={character.person.image ? character.person.image.medium : 'https://www.classicposters.com/images/nopicture.gif'}
                        url={character.person.url} />
                )
            });
        }
        return castDisplay;
    }
}