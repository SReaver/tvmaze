import React from 'react';
import './Movie.scss'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
const movie = (props) => (
    <Card>
        <CardImg onClick={props.clicked} top src={props.imgUrl} alt={props.title} />
        <CardBody>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle>{props.premiered}</CardSubtitle>
            <CardText><small>Status: {props.status}</small></CardText>
            <Button onClick={props.addToWatchlist}>Add to watchlist</Button>
        </CardBody>
    </Card>

);
export default movie;