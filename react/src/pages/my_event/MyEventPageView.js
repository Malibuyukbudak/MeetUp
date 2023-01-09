import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import MyCardEvent from '../../companents/my_event_card/MyEventCard';
import { useSelector } from 'react-redux';

export function MyEventPageView({ deleteEvent, updateEvent }) {
  const { categoryData, isLoadingCategory } = useSelector((state) => state.categories);
  const { userEventData, isLoadingUser } = useSelector((state) => state.userEvent);

  if (isLoadingCategory || isLoadingUser) {
    return (<div>
      Loading...
    </div>)
  }
  return (
    <div>
      <Row xs={1} md={1}>
        {userEventData?.map((data, index) => (
          <div key={index}>
            <Col >
              <MyCardEvent
                id={data?._id || data.id}
                title={data?.title}
                categoryId={data?.categories?._id || data?.categories?.id}
                categories={data?.categories?.name}
                date={data?.created}
                description={data?.description}
                image={data?.image}
                capacity={data?.capacity}
                city={data?.city}
                state={data?.state}
                getCategories={categoryData?.data}
                deleteEvent={deleteEvent}
                updateEvent={updateEvent}
              >
              </MyCardEvent>
            </Col>
          </div>
        ))}
      </Row>
    </div>

  )
}
