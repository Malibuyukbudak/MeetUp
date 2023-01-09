import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './CardEvent.css'

function CardEvent({ id, title, description, image, date, categories, quota, joinedCount, favoriteCount }) {
  return (
    <div style={{ margin: '40px' }}>

      <Card style={{ width: '19rem' }}>
        <Card.Img className='card-image' variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className='card-description'>
            {description}
          </Card.Text>
          <Link to={`/event/${id}`}>
            <Button variant="outline-secondary">View More</Button>
          </Link>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item> Category: {categories}</ListGroup.Item>
          <ListGroup.Item> Capacity: {joinedCount}/{quota}</ListGroup.Item>
          <ListGroup.Item> Favorite Count: {favoriteCount}</ListGroup.Item>
          <ListGroup.Item>{date}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>

  )
}

export default CardEvent