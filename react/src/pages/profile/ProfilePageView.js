import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProfileCard from '../../companents/profile_card/ProfileCard';

function ProfilePageView() {
  const { data, isLoading } = useSelector((state) => state.profile);
  if (isLoading) {
    return (<div>
      Loading ..
    </div>)
  }
  return (
    <Row >
      <Col >
        <ProfileCard
          id={data?._id || data?.id}
          nameSurname={data?.nameSurname}
          username={data?.username || data?.userName}
          email={data?.email}
          password={data?.password || data?.passwordHash}
          telephone={data?.telephone || data?.phoneNumber}
        >
        </ProfileCard>
      </Col>
    </Row>
  )
}

export default ProfilePageView