import { useSelector } from 'react-redux';
import CreateFormEvent from '../../companents/form/CreateFormEvent';

function CreatedEventPageView({ createEvent }) {
    const { categoryData, isLoading } = useSelector((state) => state.categories);
    if (isLoading) {
        return (<div>
            Loading ..
        </div>)
    }
    return (
        <CreateFormEvent
            capacity={100}
            city={''}
            date={''}
            description={''}
            image={''}
            title={''}
            state={''}
            categories={``}
            createEventSubmit={createEvent}
            getCategories={categoryData.data}
        >
        </CreateFormEvent>
    )
}

export default CreatedEventPageView