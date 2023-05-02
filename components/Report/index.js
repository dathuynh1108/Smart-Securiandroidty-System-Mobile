import { Dimensions, Text, View } from "react-native";
import '../../styles/appStyles';
import { appStyles } from "../../styles/appStyles";
import { styles } from "./styles"
import dataEvents from '../../utils/dummyData/eventList.json';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTConfigAPI } from "../../apis/IoTConfigAPI";
import { EventTypeAPI } from "../../apis/EventType";
import { mapperIOTConfigListFromDatabaseToFE } from "../../utils/mapper/configuration";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Report({ navigation }) {

    const dispatch = useDispatch();
    const originalEventsListRedux = useSelector(state => state.event.originalEventsList);
    const [totalEvents, setTotalEvents] = useState('');
    const [processedEvents, setProcessedEvents] = useState('');
    const [trueEvents, setTrueEvents] = useState('');
    const [falseEvents, setFalseEvents] = useState('');
    const [iotConfigurations, setIotConfigurations] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([]);

    const handleDataForPieChart = (events, iotConfigs, eventTypeList) => {

        let objIoTConfig = {}, data = [], objEventType = {};
        for (let i = 0; i < events.length; i++) {
            let iotConfigId = events[i].iot_device;
            for (let j = 0; j < iotConfigs.length; j++) {
                if (iotConfigId == iotConfigs[j].id || iotConfigId == iotConfigs[j]._id) {
                    // objIoTConfig[iotConfigId] = { ...iotConfigs[j], "number": 0 };
                    // break;

                    let eventTypeId = iotConfigs[j].event_type;
                    for (let m = 0; m < eventTypeList.length; m++) {
                        if (eventTypeId == eventTypeList[m]._id) {
                            if (objEventType[eventTypeId] == undefined) {
                                objEventType[eventTypeId] = { ...eventTypeList[m], "number": 0 };
                            }
                        }
                    }
                    objEventType[eventTypeId]['number'] = objEventType[eventTypeId]['number'] + 1;
                    break;
                }
            }
        }
        for (const property in objEventType) {
            let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            let labelName = objEventType[property]['event_name']
            let obj = {
                name: labelName,
                population: objEventType[property]['number'],
                color: randomColor,
                legendFontColor: randomColor,
                legendFontSize: 11,
            }
            data.push(obj);
        }

        setDataPieChart(data);
    }


    useEffect(() => {

        let iotConfigs = [], eventTypes = [];
        IoTConfigAPI.getAll().then(res => {
            iotConfigs = res.data.iot_devices;

            EventTypeAPI.getAll().then(res => {
                eventTypes = res.data.event_types;

                let mapperIoTConfigs = mapperIOTConfigListFromDatabaseToFE(iotConfigs);

                setIotConfigurations(mapperIoTConfigs);
                handleDataForPieChart(originalEventsListRedux, mapperIoTConfigs, eventTypes);
            })
        })


        // let currentEvents = dataEvents;
        // let processedNumber = 0, trueAlarmNumber = 0, falseAlarmNumber = 0;
        // for (let i = 0; i < currentEvents.length; i++) {
        //     if (currentEvents[i]["confirm_status"] == "done") {
        //         processedNumber += 1;
        //     }

        //     if (currentEvents[i]["true_alarm"] == true) {
        //         trueAlarmNumber += 1;
        //     } else {
        //         falseAlarmNumber += 1;
        //     }
        // }

        // let percentTrueAlarm = parseFloat(trueAlarmNumber / (trueAlarmNumber + falseAlarmNumber) * 100).toFixed(2);
        // let percentFalseAlarm = parseFloat(100 - parseFloat(percentTrueAlarm).toFixed(2)).toFixed(2);

        // setTotalEvents(currentEvents.length);
        // setProcessedEvents(processedNumber)
        // setTrueEvents(percentTrueAlarm);
        // setFalseEvents(percentFalseAlarm);
    }, [])


    return (
        <View style={[appStyles.appContainer, { marginLeft: 10, marginRight: 10, marginTop: 10, }]}>

            <View style={styles.allEventsAndProcessedEvents}>
                <View style={styles.allEvents}>
                    <Text style={styles.allEventsText}>Tổng số sự kiện</Text>
                    <Text style={styles.allEventsNumber}>{totalEvents}</Text>
                </View>

                <View style={styles.processedEvents}>
                    <Text style={styles.processedEventsText}>Sự kiện đã xử lý</Text>
                    <Text style={styles.processedEventsNumber}> {processedEvents} </Text>
                </View>
            </View>


            <View style={styles.trueAndFalseAlarm}>
                <View style={styles.trueAlarm}>
                    <Text style={styles.trueAlarmText}>Báo động thật</Text>
                    <Text style={styles.trueAlarmNumber}> {trueEvents} </Text>
                </View>

                <View style={styles.falseAlarm}>
                    <Text style={styles.falseAlarmText}>Báo động giả</Text>
                    <Text style={styles.falseAlarmNumber}> {falseEvents} </Text>
                </View>
            </View>

            <View>
                <PieChart
                    data={dataPieChart}
                    width={screenWidth}
                    height={290}
                    chartConfig={styles.chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    paddingRight={"15"}
                    center={[10, 10]}
                    absolute
                />
            </View>

        </View>
    );
}