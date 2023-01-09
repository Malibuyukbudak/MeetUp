import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardEvent from "../../companents/event_card/CardEvent";

export function FavoriteEventPageView({ allData }) {
  const { isLoadingUserFavorite, userFavoriteEventData } = useSelector((state) => state.userFavoriteEvent);

  if (isLoadingUserFavorite) {
    return (<div>
      Uploading ...
    </div>)
  }
  return (
    <div>
      <Row xs={1} md={4}>
        {userFavoriteEventData?.map((data, index) => (
          <div key={index}>
            <Col >
              <CardEvent
                id={data?.event?._id || data?.event?.id}
                title={data?.event?.title}
                categories={data?.event?.categories?.name}
                date={data?.event?.created}
                description={data?.event?.description}
                image={data?.event?.image}
                quota={data?.event?.capacity}
                favoriteCount={data?.favoriteCount}
                joinedCount={data?.joinedCount}
              >
              </CardEvent>
            </Col>
          </div>
        ))}
      </Row>
    </div>

  )

}
