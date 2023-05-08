
export const seriesColumnChartEmpty = []

export const optionsColumnChartEmpty = {
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    xaxis: {
        categories: [
        ],
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
    },
};

export const helperColumnChart = (items) => {
    let obj = {}
    for (let i = 0; i < items.length; i++) {
        let idNumber = items[i]._id.iot_device_type._id;
        let iot_device_type_name = items[i]._id.iot_device_type.iot_device_type_name;
        let ai_true_alarm = items[i]._id.ai_true_alarm
        let event_count = items[i].event_count

        let infoObj = {}
        if (ai_true_alarm == false) {
            infoObj = {
                ...obj[idNumber],
                iot_device_type_name,
                "false_alarm_count": event_count
            }
        } else {
            infoObj = {
                ...obj[idNumber],
                iot_device_type_name,
                "true_alarm_count": event_count
            }
        }

        obj[idNumber] = infoObj;
    }

    console.log("object column chart: ", obj);

    let xaxisColumnChart = [], dataForTrueAlarm = [], dataForFalseAlarm = []
    for (let property in obj) {
        let iot_type_name = obj[property].iot_device_type_name;
        let true_alarm_count = obj[property].true_alarm_count ? obj[property].true_alarm_count : 0;
        let false_alarm_count = obj[property].false_alarm_count ? obj[property].false_alarm_count : 0;
        xaxisColumnChart.push(iot_type_name);
        dataForFalseAlarm.push(false_alarm_count);
        dataForTrueAlarm.push(true_alarm_count);
    }

    return { xaxisColumnChart, dataForTrueAlarm, dataForFalseAlarm };
}

export const getThingsForColumnChart = (resColumnChart) => {
    let seriesColumnChartConstant = [
        {
            name: 'Báo động thật',
            data: resColumnChart.dataForTrueAlarm
        }, {
            name: 'Báo động giả',
            data: resColumnChart.dataForFalseAlarm
        }
    ]

    let optionsColumnChartConstant = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        xaxis: {
            categories: resColumnChart.xaxisColumnChart,
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50
        },
    };


    return { seriesColumnChartConstant, optionsColumnChartConstant }
}

export const columnChartEmpty = {
    labels: [],
    legend: [],
    data: [

    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

export const helperColumnChartMobile = (items) => {
    console.log("helperColumnChartMobile: ", items)
    let obj = {}
    for (let i = 0; i < items.length; i++) {
        let idNumber = items[i]._id.iot_device_type._id;
        let iot_device_type_name = items[i]._id.iot_device_type.iot_device_type_name;
        let ai_true_alarm = items[i]._id.ai_true_alarm
        let event_count = items[i].event_count

        let infoObj = {}
        if (ai_true_alarm == false) {
            infoObj = {
                ...obj[idNumber],
                iot_device_type_name,
                "false_alarm_count": event_count
            }
        } else {
            infoObj = {
                ...obj[idNumber],
                iot_device_type_name,
                "true_alarm_count": event_count
            }
        }

        obj[idNumber] = infoObj;
    }

    // console.log("object column chart: ", obj);

    let xaxisColumnChart = [], dataForTrueAlarm = [], dataForFalseAlarm = [], dataset = []
    for (let property in obj) {
        let iot_type_name = obj[property].iot_device_type_name;
        let true_alarm_count = obj[property].true_alarm_count ? obj[property].true_alarm_count : 0;
        let false_alarm_count = obj[property].false_alarm_count ? obj[property].false_alarm_count : 0;
        xaxisColumnChart.push(iot_type_name);
        dataset.push([true_alarm_count, false_alarm_count])
        // dataForFalseAlarm.push(false_alarm_count);
        // dataForTrueAlarm.push(true_alarm_count);
    }




    const data = {
        labels: xaxisColumnChart,
        legend: ['Báo động thật', 'Báo động giả'],
        data: dataset,
        // barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
        barColors: ["green", "yellow"]
    };

    return data;
}


export const helperPieChart = (items) => {
    let obj = {}
    for (let i = 0; i < items.length; i++) {
        let idNumber = items[i]._id.iot_device_type._id;
        let iot_device_type_name = items[i]._id.iot_device_type.iot_device_type_name;
        // let ai_true_alarm = items[i]._id.ai_true_alarm
        let event_count = items[i].event_count

        let infoObj = {
            ...obj[idNumber],
            iot_device_type_name,
            event_count
        }

        obj[idNumber] = infoObj;
    }

    console.log("object pie chart: ", obj);

    let xaxisPieChart = [], dataForPieChart = [], dataForFalseAlarm = []
    for (let property in obj) {
        let iot_type_name = obj[property].iot_device_type_name;
        let event_count = obj[property].event_count;

        xaxisPieChart.push(iot_type_name);
        dataForPieChart.push(event_count);
    }

    return { xaxisPieChart, dataForPieChart };
}

export const getThingsForPieChart = (resPieChart) => {
    let seriesPieChartConstant = resPieChart.dataForPieChart

    let optionsPieChartConstant = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom',
                    fontSize: '20px'
                },
            }
        }],
        labels: resPieChart.xaxisPieChart,
        dataLabels: {
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex]
            },
            style: {
                fontSize: "25px"
            }
        },
        // title: {
        //     text: "Thống kê số sự kiện theo loại cảm biến",
        //     align: 'left'
        // }
    }


    return { seriesPieChartConstant, optionsPieChartConstant }
}

const helperIntervalAreaChart = (item, interval_type) => {
    let res = ''
    if (interval_type == 'date') {
        res = item._id.day + '/' + item._id.month + '/' + item._id.year
    } else if (interval_type == 'week') {
        res = 'Tuần ' + item._id.week + ' năm ' + item._id.year
    } else if (interval_type == 'month') {
        res = item._id.month + '/' + item._id.year
    } else if (interval_type == 'year') {
        res = item._id.year
    }

    return res;
}


export const helperAreaChart = (items, interval_type) => {
    let xaxisAreaChart = [], dataForAreaChart = [], dataForFalseAlarm = []
    for (let i = 0; i < items.length; i++) {
        let event_count = items[i].event_count;
        let label = helperIntervalAreaChart(items[i], interval_type);
        xaxisAreaChart.push(label);
        dataForAreaChart.push(event_count)
    }

    console.log("xaxisAreaChart area chart: ", xaxisAreaChart);

    return { xaxisAreaChart, dataForAreaChart };
}

export const getThingsForAreaChart = (resAreaChart) => {
    let seriesAreaChartConstant = [{
        name: 'Số sự kiện',
        data: resAreaChart.dataForAreaChart
    }];

    let optionsAreaChartConstant = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'date',
            categories: resAreaChart.xaxisAreaChart
        },
        yaxis: {
            labels: {
                offsetY: 1,
                offsetX: 1
            },
            min: 0,
            // max: 200,
            tickAmount: 1,
        }
        // tooltip: {
        //     x: {
        //         format: 'dd/MM/yy'
        //     },
        // },
    };


    return { seriesAreaChartConstant, optionsAreaChartConstant }
}



export const getSelectionAreas = (items) => {
    items = items.map(item => {
        return {
            value: item._id,
            label: item.area_name,
        }
    })
    items.push({
        label: '',
        value: '',
    })

    return items;
}

export const getSelectionBuildings = (items) => {
    items = items.map(item => {
        return {
            value: item._id,
            label: item.area_name,
        }
    })
    items.push({
        label: '',
        value: '',
    })

    return items;
}

export const getSelectionFloors = (items) => {
    items = items.map(item => {
        return {
            value: item._id,
            label: item.area_name,
        }
    })
    items.push({
        label: '',
        value: '',
    })

    return items;
}

export const getSelectionIotTypes = (items) => {
    items = items.map(item => {
        return {
            value: item._id,
            label: item.iot_device_type_name,
        }
    })
    items.push({
        label: '',
        value: '',
    })

    return items;
}