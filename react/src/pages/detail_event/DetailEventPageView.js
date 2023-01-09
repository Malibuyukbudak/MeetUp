import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DetailCardEvent from '../../companents/detail_card/DetailCardEvent';

function DetailEventPageView({ createFavorite,deleteFavorite, createJoin, deleteJoin }) {
  const {data} = useSelector((state) => state.getEvent);

  return (
    <Row >
      <Col >
        <DetailCardEvent
          id={data?._id || data?.id}
          title={data?.title}
          categories={data?.categories?.name}
          date={data?.created}
          description={data?.description}
          image={data?.image}
          quota={data?.capacity}
          location={data?.city}
          favoriteAxios={createFavorite}
          deleteFavorite={deleteFavorite}
          isFavorite={data?.isFavorite}
          joinAxios={createJoin}
          isJoined={data?.isJoined}
          deleteJoin={deleteJoin}
        >
        </DetailCardEvent>
      </Col>
    </Row>
  )
}

export default DetailEventPageView