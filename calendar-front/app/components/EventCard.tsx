import Link from 'next/link';
import { EventType } from './EventsContext';

interface EventCardProps {
    event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { online, location, urlEvent, urlMeeting } = event;

    const eventDate = new Date(event.date);
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();

    const eventHours = eventDate.getHours();
    const eventMinutes = eventDate.getMinutes();
    const formattedDate = `${eventDay.toString().padStart(2, '0')}/${eventMonth.toString().padStart(2, '0')}/${eventYear}`;
    const formattedTime = `${eventHours.toString().padStart(2, '0')}:${eventMinutes.toString().padStart(2, '0')}`;

    const renderEventUrl = () => {
        if (online) {
            return (
                <>
                    <p className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300">Evento en línea</p>
                    {urlEvent && <a className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300" href={urlEvent}>URL del Evento: {urlEvent}</a>}
                    {urlMeeting && <a className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300" href={urlMeeting}>URL de la Reunión: {urlMeeting}</a>}
                </>
            );
        } else {
            return (
                <>
                    {location?.name && <p className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300">{location.name}</p>}
                    {urlEvent ? (
                        <a className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300" href={urlEvent}>URL del Evento: {urlEvent}</a>
                    ) : (
                        <p className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300">No se proporcionó URL del evento</p>
                    )}
                </>
            );
        }
    };

    return (
        <div className="group bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <img src={event.coverPhoto} alt={event.title} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold group-hover:translate-y-1 transition-transform duration-300 text-black">{event.title}</h3>
                {renderEventUrl()}
                <p className="text-gray-500 group-hover:translate-y-1 transition-transform duration-300">{formattedTime}</p>
                <Link href="/ruta/a/detalle" className="text-indigo-500 hover:text-indigo-600 group-hover:translate-y-1 transition-transform duration-300">
                    Más detalles
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
