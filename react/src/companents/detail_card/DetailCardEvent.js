import { Image, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './DetailCardEvent.css'

function DetailCardEvent({ id, title, description, image, date, categories, quota, location,
  favoriteAxios, deleteFavorite, isFavorite, joinAxios, deleteJoin, isJoined }) {

  return (
    <div style={{ margin: '40px', display: 'block', width: 800 }}>

      <div className="left">
        <Image variant="top" className='detail-card-image' src={image} />
        <ListGroup >
          <ListGroup.Item className='title'>{title} </ListGroup.Item >
          <ListGroup.Item>{date}</ListGroup.Item>
          <ListGroup.Item> Category: {categories}</ListGroup.Item>
          <ListGroup.Item> Capacity: {quota}</ListGroup.Item>
          <ListGroup.Item> Location: {location}</ListGroup.Item>
        </ListGroup>
        <ListGroup >
          <ListGroup.Item  >
            <Button
              variant={isFavorite === true ? "danger" : "outline-danger"}
              onClick={isFavorite === false ? favoriteAxios : deleteFavorite}
            >Favorite
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant={isJoined === true ? "success" : "outline-success"}
              onClick={isJoined === false ? joinAxios : deleteJoin}
            >
              Join
            </Button>
          </ListGroup.Item >
        </ListGroup>
      </div>

      <div className="right">
        <ListGroup>
          <div className='description'>Description</div>
          <ListGroup.Item  >
            {description}
          </ListGroup.Item >
        </ListGroup>
      </div>
    </div>
  )
}

export default DetailCardEvent