import CardEvent from '../../companents/event_card/CardEvent';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export function HomePageView() {
  const { isLoadingAllEvent, allEventData } = useSelector((state) => state.allEvent);

  if (isLoadingAllEvent) {
    return (<div>
      Uploading ...
    </div>)
  }
  return (
    <div>
      <Row xs={1} md={4}>
        {allEventData?.map((data, index) => (
          <div key={index}>
            <Col >
              <CardEvent
                id={data?._id || data?.id}
                title={data?.title}
                categories={data?.categories?.name}
                date={data?.created}
                description={data?.description}
                image={data?.image}
                quota={data?.capacity}
                joinedCount={data?.joinedCount}
                favoriteCount={data?.favoriteCount}
              >
              </CardEvent>
            </Col>
          </div>
        ))}
      </Row>
    </div>

  )
}
