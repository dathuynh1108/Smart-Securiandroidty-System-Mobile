import { Dimensions, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import '../../styles/appStyles';
import { appStyles } from "../../styles/appStyles";
import { styles } from "./styles"
// import dataEvents from '../../utils/dummyData/eventList.json';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTConfigAPI } from "../../apis/IoTConfigAPI";
import { EventTypeAPI } from "../../apis/EventType";
import { mapperIOTConfigListFromDatabaseToFE, mapperListAreaFromDatabaseToFE, mapperListBuildingFromDatabaseToFE, mapperListFloorFromDatabaseToFE } from "../../utils/mapper/configuration";
import { LineChart, PieChart, StackedBarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native";
import { AreaAPI } from "../../apis/AreaAPI";
import { BuildingAPI } from "../../apis/BuildingAPI";
import { FloorAPI } from "../../apis/FloorAPI";
import { ReportAPI } from "../../apis/ReportAPI";
import { columnChartEmpty, getSelectionAreas, getSelectionBuildings, getSelectionFloors, getSelectionIotTypes, getThingsForColumnChart, helperAreaChart, helperColumnChart, helperColumnChartMobile, lineChartEmpty } from "../../utils/helper/helperReport";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { IoTTypeAPI } from "../../apis/IotTypeAPI";

const screenWidth = Dimensions.get("window").width;

export default function Report({ navigation }) {

    // const dispatch = useDispatch();
    // const originalEventsListRedux = useSelector(state => state.event.originalEventsList);
    // const [totalEvents, setTotalEvents] = useState('');
    // const [processedEvents, setProcessedEvents] = useState('');
    // const [trueEvents, setTrueEvents] = useState('');
    // const [falseEvents, setFalseEvents] = useState('');
    // const [iotConfigurations, setIotConfigurations] = useState([]);
    // const [eventTypes, setEventTypes] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([]);
    const [statisticsCount, setStatisticsCount] = useState([]);
    const [columnChartData, setColumnChartData] = useState(columnChartEmpty)
    const [lineChartData, setLineChartData] = useState(lineChartEmpty)
    const [visible, setVisible] = useState(false);
    const [visibleColumnChartArea, setVisibleColumnChartArea] = useState(false);
    const [visibleColumnChartInterval, setVisibleColumnChartInterval] = useState(false);
    const [visibleColumnChartIoTType, setvisibleColumnChartIoTType] = useState(false);
    // const [visible, setVisible] = useState(false);
    // const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedMenuText, setSelectedMenuText] = useState('');
    const [selectedMenuTextLineChart, setSelectedMenuTextLineChart] = useState('');
    const [selectedIntervalTypeTextLineChart, setSelectedIntervalTypeTextLineChart] = useState('');
    const [selectedIoTTypeTextLineChart, setSelectedIoTTypeTextLineChart] = useState('');
    const [selectionColumnChart, setSelectionColumnChart] = useState([]);
    const [selectionIoTTypeLineChart, setSelectionIoTTypeLineChart] = useState([]);
    const [paramLineChart, setParamLineChart] = useState({})

    // const handleDataForPieChart = (events, iotConfigs, eventTypeList) => {

    //     let objIoTConfig = {}, data = [], objEventType = {};
    //     for (let i = 0; i < events.length; i++) {
    //         let iotConfigId = events[i].iot_device;
    //         for (let j = 0; j < iotConfigs.length; j++) {
    //             if (iotConfigId == iotConfigs[j].id || iotConfigId == iotConfigs[j]._id) {

    //                 let eventTypeId = iotConfigs[j].event_type;
    //                 for (let m = 0; m < eventTypeList.length; m++) {
    //                     if (eventTypeId == eventTypeList[m]._id) {
    //                         if (objEventType[eventTypeId] == undefined) {
    //                             objEventType[eventTypeId] = { ...eventTypeList[m], "number": 0 };
    //                         }
    //                     }
    //                 }
    //                 objEventType[eventTypeId]['number'] = objEventType[eventTypeId]['number'] + 1;
    //                 break;
    //             }
    //         }
    //     }
    //     for (const property in objEventType) {
    //         let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    //         let labelName = objEventType[property]['event_name']
    //         let obj = {
    //             name: labelName,
    //             population: objEventType[property]['number'],
    //             color: randomColor,
    //             legendFontColor: randomColor,
    //             legendFontSize: 11,
    //         }
    //         data.push(obj);
    //     }

    //     setDataPieChart(data);
    // }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {

            let allStatisticsCount = [], statisticsColumnChart = [], areas = [], buildings = [], floors = [], statisticsPieChart = []
            AreaAPI.getAll().then(res => {
                // console.log("get all areas: ", res.data.areas);
                areas = res.data.areas;

                BuildingAPI.getAll().then(res => {
                    // console.log("get all buildings: ", res.data.areas)
                    buildings = res.data.areas;

                    FloorAPI.getAll().then(res => {
                        // console.log("get all floors: ", res.data.areas)
                        floors = res.data.areas;

                        ReportAPI.getAllEventStatisticCount().then(res => {
                            allStatisticsCount = res.data;

                            let newParam = {
                                'area_id': areas[0]._id,
                                'start_time': '2023-01-01T03:38:17.904Z',
                                'end_time': '2023-12-31T05:38:17.904Z'
                            }
                            ReportAPI.getNumberOfIoTEventByTypeAndTrueAlarm(newParam).then(res => {
                                statisticsColumnChart = res.data;

                                ReportAPI.getNumberOfIoTEventByType(newParam).then(res => {
                                    statisticsPieChart = res.data;
                                    setStatisticsCount(allStatisticsCount)

                                    let resColumnChart = helperColumnChartMobile(statisticsColumnChart);
                                    setColumnChartData(resColumnChart)

                                    // console.log("statisticsPieChart: ", statisticsPieChart)

                                    // let resPieChart = helperPieChart(statisticsPieChart)
                                    // let thingsForPieChart = getThingsForPieChart(resPieChart);
                                    // // console.log("thingsForPieChart: ", thingsForPieChart)
                                    // setOptionsPieChart(thingsForPieChart.optionsPieChartConstant)
                                    // setSeriesPieChart(thingsForPieChart.seriesPieChartConstant);


                                    // let resColumnChart = helperColumnChart(statisticsColumnChart)
                                    // let thingsForColumnChart = getThingsForColumnChart(resColumnChart);
                                    // setOptionsColumnChart(thingsForColumnChart.optionsColumnChartConstant)
                                    // setSeriesColumnChart(thingsForColumnChart.seriesColumnChartConstant);


                                    // setStatisticsCount(allStatisticsCount)
                                    // setFirstFetch(false);
                                    // setOptionsPieChart(optionsChart)
                                    // setSeriesPieChart(series);



                                    // let mapperAreas = mapperListAreaFromDatabaseToFE(areas);
                                    // let mapperBuildings = mapperListBuildingFromDatabaseToFE(buildings);
                                    // let mapperFloors = mapperListFloorFromDatabaseToFE(floors, mapperBuildings);

                                    // let selectAreas = getSelectionAreas(mapperAreas);
                                    // let selectBuildings = getSelectionBuildings(mapperBuildings);
                                    // let selectFloors = getSelectionFloors(mapperFloors);
                                    // console.log("mapper areas report: ", selectAreas);


                                    // setSelectionAreas(selectAreas)
                                    // setSelectionBuildings(selectBuildings);
                                    // setSelectionFloors(selectFloors);
                                    // setDefaultAreaId(newParam.area_id);
                                    // setUserSelectColumnChart({ ...userSelectColumnChart, 'area_name': newParam.area_id, 'start_time': '2023-01-01T00:00:17.904Z', 'end_time': '2023-12-31T23:59:17.904Z' })
                                    // setUserSelectPieChart({ ...userSelectPieChart, 'area_name': newParam.area_id, 'start_time': '2023-01-01T00:00:17.904Z', 'end_time': '2023-12-31T23:59:17.904Z' })
                                })
                            })
                        })
                    })
                })
            })

            setRefreshing(false);
        }, 3000);
    }, []);
    const handleSelectMenu = (type, label) => {
        // console.log("type: ", type)
        let newParam = {
            'area_id': type,
            'start_time': '2023-01-01T03:38:17.904Z',
            'end_time': '2023-12-31T05:38:17.904Z'
        }

        let statisticsColumnChart = [];
        ReportAPI.getNumberOfIoTEventByTypeAndTrueAlarm(newParam).then(res => {
            statisticsColumnChart = res.data;
            let resColumnChart = helperColumnChartMobile(statisticsColumnChart);
            setColumnChartData(resColumnChart)
        })
        setSelectedMenuText(label)
        hideMenu();
    }

    const handleSelectMenuAreaColumn = (type, label) => {
        // console.log("type: ", type)
        let newParam = { ...paramLineChart, 'area_id': type }
        // console.log("param interval: ", newParam);
        let statisticsLineChart = [];
        ReportAPI.getNumberOfIoTEventByInterval(newParam).then(res => {
            statisticsLineChart = res.data;
            // console.log(" statisticsLineChart: ", statisticsLineChart);
            let dataForAreaChart = helperAreaChart(statisticsLineChart, paramLineChart.interval_type);
            // console.log("dataForAreaChart: ", dataForAreaChart);
            setLineChartData(prev => dataForAreaChart);
            setSelectedMenuTextLineChart(label)
            setParamLineChart({ ...paramLineChart, "area_id": type })
            hideMenuAreaColumn();
        })

    }

    const handleSelectMenuIntervalColumn = (type, label) => {
        // console.log("type: ", type)
        // let newParam = {
        //     'area_id': type,
        //     'start_time': '2023-01-01T03:38:17.904Z',
        //     'end_time': '2023-12-31T05:38:17.904Z'
        // }

        // let statisticsColumnChart = [];
        // ReportAPI.getNumberOfIoTEventByTypeAndTrueAlarm(newParam).then(res => {
        //     statisticsColumnChart = res.data;
        //     let resColumnChart = helperColumnChartMobile(statisticsColumnChart);
        //     setColumnChartData(resColumnChart)
        // })


        let newParam = { ...paramLineChart, 'interval_type': type }
        // console.log("param interval: ", newParam);
        let statisticsLineChart = [];
        ReportAPI.getNumberOfIoTEventByInterval(newParam).then(res => {
            statisticsLineChart = res.data;
            // console.log(" statisticsLineChart: ", statisticsLineChart);
            let dataForAreaChart = helperAreaChart(statisticsLineChart, type);
            // console.log("dataForAreaChart: ", dataForAreaChart);
            setLineChartData(prev => dataForAreaChart);
            setSelectedIntervalTypeTextLineChart(label);
            setParamLineChart({ ...paramLineChart, "interval_type": type });
            hideMenuIntervalColumn();
        })

    }

    const handleSelectMenuIotTypeColumn = (type, label) => {
        let newParam = { ...paramLineChart, 'iot_device_type_id': type }
        // console.log("param interval: ", newParam);
        let statisticsLineChart = [];
        ReportAPI.getNumberOfIoTEventByInterval(newParam).then(res => {
            statisticsLineChart = res.data;
            // console.log(" statisticsLineChart: ", statisticsLineChart);
            let dataForAreaChart = helperAreaChart(statisticsLineChart, paramLineChart.interval_type);
            // console.log("dataForAreaChart: ", dataForAreaChart);
            setLineChartData(prev => dataForAreaChart);
            setSelectedIoTTypeTextLineChart(label)
            setParamLineChart({ ...paramLineChart, "iot_device_type_id": type })
            hideMenuIoTTypeColumn();
        })



    }

    // const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);


    const hideMenuAreaColumn = () => setVisibleColumnChartArea(false);
    const showMenuAreaColumn = () => setVisibleColumnChartArea(true);

    const hideMenuIntervalColumn = () => setVisibleColumnChartInterval(false);
    const showMenuIntervalColumn = () => setVisibleColumnChartInterval(true);

    const hideMenuIoTTypeColumn = () => setvisibleColumnChartIoTType(false);
    const showMenuIoTTypeColumn = () => setvisibleColumnChartIoTType(true);


    useEffect(() => {


        let allStatisticsCount = [], statisticsColumnChart = [], areas = [], buildings = [], floors = [], statisticsPieChart = [], iotTypes = [], statisticsLineChart = [];
        AreaAPI.getAll().then(res => {
            // console.log("get all areas: ", res.data.areas);
            areas = res.data.areas;

            BuildingAPI.getAll().then(res => {
                // console.log("get all buildings: ", res.data.areas)
                buildings = res.data.areas;

                FloorAPI.getAll().then(res => {
                    // console.log("get all floors: ", res.data.areas)
                    floors = res.data.areas;

                    ReportAPI.getAllEventStatisticCount().then(res => {
                        allStatisticsCount = res.data;

                        let newParam = {
                            'area_id': areas[0]._id,
                            'start_time': '2023-01-01T03:38:17.904Z',
                            'end_time': '2023-12-31T05:38:17.904Z'
                        }
                        ReportAPI.getNumberOfIoTEventByTypeAndTrueAlarm(newParam).then(res => {
                            statisticsColumnChart = res.data;

                            ReportAPI.getNumberOfIoTEventByType(newParam).then(res => {
                                statisticsPieChart = res.data;
                                setStatisticsCount(allStatisticsCount)


                                IoTTypeAPI.getAll().then(res => {
                                    iotTypes = res.data.iot_device_types;

                                    let newParamLineChart = {
                                        'area_id': areas[0]._id,
                                        'start_time': '2023-01-01T03:38:17.904Z',
                                        'end_time': '2023-12-31T05:38:17.904Z',
                                        'iot_device_type_id': iotTypes[0]._id,
                                        'interval_type': 'date',
                                    }

                                    ReportAPI.getNumberOfIoTEventByInterval(newParamLineChart).then(res => {
                                        statisticsLineChart = res.data;

                                        let dataForAreaChart = helperAreaChart(statisticsLineChart, 'date');
                                        // console.log("dataForAreaChart: ", dataForAreaChart)
                                        setLineChartData(prev => dataForAreaChart);
                                        let selectIoTTypes = getSelectionIotTypes(iotTypes);
                                        setSelectionIoTTypeLineChart(selectIoTTypes);
                                        // console.log("iotTypes: ", iotTypes)
                                        setSelectedIoTTypeTextLineChart(iotTypes[0].iot_device_type_name)
                                        setParamLineChart(newParamLineChart);


                                        // console.log("statisticsPieChart: ", statisticsPieChart)

                                        // let resPieChart = helperPieChart(statisticsPieChart)
                                        // let thingsForPieChart = getThingsForPieChart(resPieChart);
                                        // // console.log("thingsForPieChart: ", thingsForPieChart)
                                        // setOptionsPieChart(thingsForPieChart.optionsPieChartConstant)
                                        // setSeriesPieChart(thingsForPieChart.seriesPieChartConstant);


                                        setSelectedMenuText(areas[0].area_name)
                                        let resColumnChart = helperColumnChartMobile(statisticsColumnChart);
                                        setColumnChartData(resColumnChart)
                                        // let thingsForColumnChart = getThingsForColumnChart(resColumnChart);
                                        // setOptionsColumnChart(thingsForColumnChart.optionsColumnChartConstant)
                                        // setSeriesColumnChart(thingsForColumnChart.seriesColumnChartConstant);


                                        // setStatisticsCount(allStatisticsCount)
                                        // setFirstFetch(false);
                                        // setOptionsPieChart(optionsChart)
                                        // setSeriesPieChart(series);

                                        setSelectedMenuTextLineChart(areas[0].area_name);
                                        setSelectedIntervalTypeTextLineChart('Ngày')



                                        let mapperAreas = mapperListAreaFromDatabaseToFE(areas);
                                        let mapperBuildings = mapperListBuildingFromDatabaseToFE(buildings);
                                        let mapperFloors = mapperListFloorFromDatabaseToFE(floors, mapperBuildings);

                                        let selectAreas = getSelectionAreas(mapperAreas);
                                        let selectBuildings = getSelectionBuildings(mapperBuildings);
                                        let selectFloors = getSelectionFloors(mapperFloors);
                                        let selectionForColumnChartCombine = selectAreas.concat(selectBuildings);
                                        selectionForColumnChartCombine = selectionForColumnChartCombine.concat(selectFloors)
                                        // console.log("selectionForColumnChartCombine: ", selectionForColumnChartCombine)
                                        setSelectionColumnChart(selectionForColumnChartCombine)
                                        // console.log("mapper areas report: ", selectAreas);


                                        // setSelectionAreas(selectAreas)
                                        // setSelectionBuildings(selectBuildings);
                                        // setSelectionFloors(selectFloors);
                                        // setDefaultAreaId(newParam.area_id);
                                        // setUserSelectColumnChart({ ...userSelectColumnChart, 'area_name': newParam.area_id, 'start_time': '2023-01-01T00:00:17.904Z', 'end_time': '2023-12-31T23:59:17.904Z' })
                                        // setUserSelectPieChart({ ...userSelectPieChart, 'area_name': newParam.area_id, 'start_time': '2023-01-01T00:00:17.904Z', 'end_time': '2023-12-31T23:59:17.904Z' })
                                    })
                                })



                            })
                        })
                    })
                })
            })
        })



        // let iotConfigs = [], eventTypes = [];
        // IoTConfigAPI.getAll().then(res => {
        //     iotConfigs = res.data.iot_devices;

        //     EventTypeAPI.getAll().then(res => {
        //         eventTypes = res.data.event_types;

        //         let mapperIoTConfigs = mapperIOTConfigListFromDatabaseToFE(iotConfigs);

        //         setIotConfigurations(mapperIoTConfigs);
        //         handleDataForPieChart(originalEventsListRedux, mapperIoTConfigs, eventTypes);
        //     })
        // })




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
    }, [refreshing])


    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={[appStyles.appContainer, { marginLeft: 10, marginRight: 10, marginTop: 10, }]}
        >

            <View style={styles.allEventsAndProcessedEvents}>
                <View style={styles.allEvents}>
                    <Text style={styles.allEventsText}>Tổng số sự kiện</Text>
                    <Text style={styles.allEventsNumber}>{statisticsCount.total_event_count}</Text>
                </View>

                <View style={styles.processedEvents}>
                    <Text style={styles.processedEventsText}>Sự kiện đã xử lý</Text>
                    <Text style={styles.processedEventsNumber}> {statisticsCount.ai_verified_event_count} </Text>
                </View>
            </View>


            <View style={styles.trueAndFalseAlarm}>
                <View style={styles.trueAlarm}>
                    <Text style={styles.trueAlarmText}>Báo động thật</Text>
                    <Text style={styles.trueAlarmNumber}> {statisticsCount.ai_true_alarm_event_count} </Text>
                </View>

                <View style={styles.falseAlarm}>
                    <Text style={styles.falseAlarmText}>Báo động giả</Text>
                    <Text style={styles.falseAlarmNumber}> {statisticsCount.ai_false_alarm_event_count} </Text>
                </View>
            </View>

            {/* <View
                style={{
                    marginTop: 40,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        height: 30,
                        // width: 'fit content'
                        // width: 200,
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                >

                    <Menu
                        style={{

                        }}
                        visible={visible}
                        anchor={<Text style={{ color: "dodgerblue", fontWeight: 'bold' }} onPress={showMenu}>Chọn khu vực: {selectedMenuText}</Text>}
                        onRequestClose={hideMenu}
                    >
                        {
                            selectionColumnChart.length != 0 ?
                                selectionColumnChart.map((item, idx) => {
                                    return <MenuItem key={idx} onPress={() => handleSelectMenu(item.value, item.label)}>{item.label}</MenuItem>
                                })
                                :
                                ''
                        }
                    </Menu>
                </TouchableOpacity>


                <StackedBarChart
                    style={{
                        marginTop: 10,
                        borderRadius: 5,
                        marginRight: 1,
                        paddingRight: 3,
                    }}
                    data={columnChartData}
                    width={screenWidth}
                    height={290}
                    center={[10, 10]}
                    chartConfig={styles.chartConfig}
                    backgroundColor={"transparent"}
                />

                <Text style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                }}>
                    Thống kê số lần báo động giả và thật của từng loại cảm biến
                </Text>
            </View>



            <View
                style={{
                    marginTop: 40,
                }}
            >

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        height: 30,
                        // width: 'fit content'
                        // width: '100%',
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        // alignItems: 'baseline'
                    }}
                >

                    <Menu
                        style={{

                        }}
                        visible={visibleColumnChartArea}
                        anchor={<Text style={{ color: "dodgerblue", fontWeight: 'bold' }} onPress={showMenuAreaColumn}>Khu vực: {selectedMenuTextLineChart}</Text>}
                        onRequestClose={hideMenuAreaColumn}
                    >

                        {
                            selectionColumnChart.length != 0 ?
                                selectionColumnChart.map((item, idx) => {
                                    return <MenuItem key={idx} onPress={() => handleSelectMenuAreaColumn(item.value, item.label)}>{item.label}</MenuItem>
                                })
                                :
                                ''
                        }
                    </Menu>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        height: 30,
                        // width: 'fit content'
                        width: 200,
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                    }}
                // onPress={() => showMenuIntervalColumn}
                >
                    <Menu
                        style={{
                            // width: '100%'
                        }}
                        visible={visibleColumnChartInterval}
                        anchor={<Text style={{ color: "dodgerblue", fontWeight: 'bold' }} onPress={showMenuIntervalColumn}>Thời gian: {selectedIntervalTypeTextLineChart}</Text>}
                        onRequestClose={hideMenuIntervalColumn}
                    >
                        <MenuItem onPress={() => handleSelectMenuIntervalColumn('date', 'Ngày')}>Ngày</MenuItem>
                        <MenuItem onPress={() => handleSelectMenuIntervalColumn('week', 'Tuần')}>Tuần</MenuItem>
                        <MenuItem onPress={() => handleSelectMenuIntervalColumn('month', 'Tháng')}>Tháng</MenuItem>
                        <MenuItem onPress={() => handleSelectMenuIntervalColumn('year', 'Năm')}>Năm</MenuItem>
                    </Menu>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        height: 30,
                        // width: 'fit content'
                        // width: 200,
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                // onPress={() => showMenuIntervalColumn}
                >
                    <Menu
                        style={{
                            // width: '100%'
                        }}
                        visible={visibleColumnChartIoTType}
                        anchor={<Text style={{ color: "dodgerblue", fontWeight: 'bold' }} onPress={showMenuIoTTypeColumn}>Loại cảm biến: {selectedIoTTypeTextLineChart}</Text>}
                        onRequestClose={hideMenuIoTTypeColumn}
                    >

                        {
                            selectionIoTTypeLineChart.length != 0 ?
                                selectionIoTTypeLineChart.map((item, idx) => {
                                    return <MenuItem key={idx} onPress={() => handleSelectMenuIotTypeColumn(item.value, item.label)}>{item.label}</MenuItem>
                                })
                                :
                                ''
                        }
                    </Menu>
                </TouchableOpacity>

                <LineChart
                    data={lineChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={styles.chartConfig}
                    style={{
                        // marginTop: 5,
                        borderRadius: 5,
                        // marginRight: 1,
                        // paddingRight: 3,
                    }}
                />

                <Text style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                }}>
                    Thống kê số lần báo động của loại cảm biến
                </Text>
            </View> */}

        </ScrollView >
    );
}