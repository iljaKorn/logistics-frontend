import {YMaps, Map, RouteButton} from '@pbe/react-yandex-maps';
import "../../css/map.css"
import {useRef} from "react";

function MapPage() {

    const map = useRef(null);
    const mapState = {
        center: [55.75, 37.57],
        zoom: 9,
        controls: [],
    };

    const addRoute = (ymaps) => {
        const pointA = [55.749, 37.524]; // Москва
        const pointB = [59.918072, 30.304908]; // Санкт-Петербург

        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: [pointA, pointB],
                params: {
                    routingMode: "car"
                }
            },
            {
                boundsAutoApply: true
            }
        );

        map.current.geoObjects.add(multiRoute);
    };

    return (
        <YMaps version="2.1.77" query={{
            apikey: '96a36820-6d7a-49d9-973b-e56f5f0383bf',
            suggest_apikey: '7726fc17-8ac6-43b3-88fb-d8272d5449c4'
        }}>
            <div>
                <Map defaultState={mapState} height={600} width={600}
                     modules={["multiRouter.MultiRoute"]}
                     instanceRef={map}
                     onLoad={addRoute}>
                    <RouteButton options={{float: "right"}}/>
                </Map>
            </div>
        </YMaps>
    );
}

export default MapPage;