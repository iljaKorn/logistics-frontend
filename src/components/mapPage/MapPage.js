import {YMaps, Map, RouteButton} from '@pbe/react-yandex-maps';
import "../../css/map.css"
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRoute} from "../../store/userSlice"
import MapTable from "./MapTable";
import {format} from "date-fns";
import axios from "axios";

function MapPage() {

    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Отправление",
            accessor: "departed",
            type: "text",
        },
        {
            Header: "Прибытие",
            accessor: "arrival",
            type: "text",
        },
        {
            Header: "Статус",
            accessor: "status",
            type: "text",
        },
        {
            Header: "Дата создания",
            accessor: "createDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },
        },
        {
            Header: "Дата прибытия",
            accessor: "arrivalDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Дата отправления",
            accessor: "dapartedDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Клиент",
            accessor: "client",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Действия",
            id: "actions",
            disableSortBy: true,
            Cell: ({row, column, cell}) =>
                <div className="edit-cell-container">
                    <div className={"edit-cell"}>
                        <button name={"done"} onClick={() => showOnMap(row.original)}>
                            Показать на карте
                        </button>
                    </div>

                </div>
        },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/trips/all",).then(res => {
            setData(res.data)
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }, []);

    const showOnMap = (row) => {
        const newData = data.map((rowData, index) => {
            if (rowData.id === row.id) {
                dispatch(setRoute([row.departed, row.arrival]))
                window.location.reload();
            }
            return rowData;
        });
        setData(newData);
    }

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const map = useRef(null);
    const mapState = {
        center: [51.694353052188156, 39.342517499999914],
        zoom: 9,
        controls: [],
    };

    const addRoute = (ymaps) => {
        const route = state.user.routeForMap
        console.log(route)

        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: route,
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

    const changeRoute = (newRoute) => {
        dispatch(setRoute(newRoute))
        console.log(newRoute)
        window.location.reload();
    }

    return (
        <div className={"map"}>
            <YMaps query={{
                apikey: '96a36820-6d7a-49d9-973b-e56f5f0383bf',
                suggest_apikey: '7726fc17-8ac6-43b3-88fb-d8272d5449c4'
            }}
            >
                <div>
                    <Map defaultState={mapState}
                         modules={["multiRouter.MultiRoute"]}
                         height={"50vw"}
                         width={"100vw"}
                         instanceRef={map}
                         onLoad={addRoute}>
                        <RouteButton options={{float: "right"}}/>
                    </Map>
                </div>
            </YMaps>
            <MapTable
                columns={columns}
                data={data}
                setData={setData}
            ></MapTable>
        </div>
    );
}

//onLoad={addRoute}
export default MapPage;