import {iEvent} from "@/pages/vacancies/Types/types";
import EventItem from "@/pages/vacancies/Modules/EventItem";

type iEventList = {
    events: Array<iEvent>;
}

const EventList = (props: iEventList) => {
    return (
        props.events.map(event => (
            <EventItem
                key={event.id}
                event={event}
            />
        ))
    )
}

export default EventList;