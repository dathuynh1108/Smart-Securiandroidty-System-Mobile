import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { RadioButton } from 'react-native-paper';
import { useEffect, useState } from "react";
import ImageModal from "react-native-image-modal";
import VideoView from "../VideoView";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentEvent, updateConfirmStatusEvent } from '../../reducers/eventReducer';
import VideoEvent from "../VideoEvent";

export default function EventDetail({ navigation, route }) {
    // console.log("route params: ", route.params)
    // console.log("function call back: ", navigation.params)
    const dispatch = useDispatch();
    const [firstFetch, setFirstFetch] = useState(true);
    const [eventDetailInfoOriginal, setEventDetailInfoOriginal] = useState({});
    const [eventDetailInfo, setEventDetailInfo] = useState({});
    const [trueAlarmRadio, setTrueAlarmRadio] = useState();
    const [disabledResponse, setDisabledResponse] = useState(true);
    const [eventComment, setEventComment] = useState('');
    const handleConfirmEditResponse = (e) => {
        /* call API to confirm comment of event */

        dispatch(updateCommentEvent({ ...eventDetailInfo, "comment": eventComment }));
        setEventDetailInfo({ ...eventDetailInfo, "comment": eventComment });

        setDisabledResponse(!disabledResponse);
    }
    const handleCancelEditResponse = (e) => {
        setDisabledResponse(!disabledResponse);
        setEventDetailInfo({ ...eventDetailInfoOriginal });
    }
    const handleChangeResponseComment = (e) => {
        console.log("change comment: ", e);
    }
    const handleConfirmStatusEvent = (e) => {
        /* call api update status event */


        // dispatch(updateConfirmStatusEvent({ ...eventDetailInfo, "confirm_status": "done" }))
        // setEventDetailInfo({ ...eventDetailInfo, "confirm_status": "done" })

        // dispatch(updateConfirmStatusEvent({ ...eventDetailInfo, "confirm_status": "human_verified" }));
        // setEventDetailInfo({ ...eventDetailInfo, "confirm_status": "human_verified" });

        dispatch(updateConfirmStatusEvent({ ...eventDetailInfo, "event_status": "human_verified" }));
        setEventDetailInfo({ ...eventDetailInfo, "event_status": "human_verified" });

        // dispatch(updateConfirmStatusEvent({}));
        console.log("handle confirm status");

        // setEventDetailInfo({});
        // setCount(prev => !prev);
    }


    useEffect(() => {
        if (firstFetch) {
            console.log("route.params: ", route.params)
            setEventDetailInfo(route.params);
            setEventDetailInfoOriginal(route.params);
            // setTrueAlarmRadio(route.params.true_alarm ? 'true' : 'false');
            setTrueAlarmRadio(route.params.human_true_alarm ? 'true' : 'false');
            setEventComment(route.params.comment);
            // console.log("comment of event: ", route.params.comment)

            setFirstFetch(false);
        }
    }, [route.params, eventDetailInfo])


    return (
        <ScrollView style={{ marginLeft: 5, marginRight: 5 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Mã số:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo.id}</Text>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Sự kiện:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo.event_name}</Text>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Zone:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo['zone']}</Text>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Vị trí:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo['address']}</Text>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Thời điểm:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo.created_at}</Text>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Thiết bị:</Text>
                    <Text style={styles.eventDetailRight}>{eventDetailInfo.device_name}</Text>
                </View>

                {/* <View style={styles.eventDetailBlock}> */}
                <View style={styles.confirmStatusBlock}>
                    <Text style={styles.confirmStatusText}>Trạng thái:</Text>
                    <Text style={styles.confirmStatusResult}>{eventDetailInfo.event_status == "human_verified" ? "Đã xác nhận" : "Chưa xác nhận"}</Text>
                    {eventDetailInfo.event_status == "human_verified" ?
                        <TouchableOpacity disabled onPress={handleConfirmStatusEvent} style={styles.confirmStatusDoneButton}>
                            {/* <Text style={styles.confirmStatusButtonText}>Xác nhận</Text> */}
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={handleConfirmStatusEvent} style={styles.confirmStatusButton}>
                            <Text style={styles.confirmStatusButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Hình ảnh thường:</Text>
                    <Text style={styles.eventDetailRight}></Text>
                </View>
                <TouchableOpacity style={styles.imageViewBlock}>
                    <ImageModal
                        resizeMode="contain"
                        style={{ width: 300, height: 300, }}
                        // source={{ uri: 'https://media.istockphoto.com/id/621984692/photo/traffic-security-camera.jpg?s=612x612&w=0&k=20&c=w1TrTBvor2fNfBPxfFpuTm5fShzkuHgRoVVUJcTK1sA=', }}
                        // source={{ uri: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/344289776_256146703543999_2352939010781704110_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_ohc=vWV8s4JXthgAX_jEiar&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQtM-bKXdsXOF4mD4Szm2dShE9eJFK2gPrSFiJDUHuoRA&oe=647F0F6F', }}
                        // source={{ uri: 'http://192.168.10.103:5005/static/general/image/20230519-154622-d81c69f21949456e8fe76744e9669965.jpg', }}
                        source={{ uri: eventDetailInfo.normal_image_url ? eventDetailInfo.normal_image_url : '', }}
                    />

                    {/* <Image
                        // style={styles.logo}
                        source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                        }}
                    /> */}

                </TouchableOpacity>


                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Hình ảnh AI:</Text>
                    <Text style={styles.eventDetailRight}></Text>
                </View>
                <TouchableOpacity style={styles.imageViewBlock}>
                    <ImageModal
                        resizeMode="contain"
                        style={{ width: 300, height: 300, }}
                        // source={{ uri: 'https://media.istockphoto.com/id/621984692/photo/traffic-security-camera.jpg?s=612x612&w=0&k=20&c=w1TrTBvor2fNfBPxfFpuTm5fShzkuHgRoVVUJcTK1sA=', }}
                        // source={{ uri: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/344289776_256146703543999_2352939010781704110_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_ohc=vWV8s4JXthgAX_jEiar&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQtM-bKXdsXOF4mD4Szm2dShE9eJFK2gPrSFiJDUHuoRA&oe=647F0F6F', }}
                        // source={{ uri: 'http://192.168.10.103:5005/static/general/image/20230519-154622-d81c69f21949456e8fe76744e9669965.jpg', }}
                        source={{ uri: eventDetailInfo.detection_image_url }}
                    />

                    {/* <Image
                        // style={styles.logo}
                        source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                        }}
                    /> */}

                </TouchableOpacity>



                {/* <ImageModal
                    resizeMode="contain"
                    style={{ width: 200, height: 200, }}
                    source={{ uri: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg' }}
                /> */}
                {/* <Image style={{ width: 200, height: 200, marginLeft: 7 }}
                    source={{ uri: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg' }} /> */}

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Video thường:</Text>
                    {
                        eventDetailInfo?.normal_video_url ?
                            <Text style={styles.eventDetailRight}></Text>
                            :
                            <Text style={styles.eventDetailRight}>Đang xử lý video...</Text>
                    }
                </View>
                {/* <VideoView video_url={'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'} /> */}
                {/* <VideoEvent video_url={`http://${IP_ADDRESS}:8080/videos/64661ac56e2fe5c1c9ab9bd3/1684481431422755200/record_2.mp4`} /> */}

                {
                    eventDetailInfo?.normal_video_url ?
                        <VideoEvent video_url={eventDetailInfo.normal_video_url} />
                        :
                        ''
                }



                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Video AI:</Text>
                    {
                        eventDetailInfo?.detection_video_url ?
                            <Text style={styles.eventDetailRight}></Text>
                            :
                            <Text style={styles.eventDetailRight}>Đang xử lý video...</Text>
                    }
                </View>
                {/* <VideoView video_url={'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'} /> */}
                {/* <VideoEvent video_url={`http://${IP_ADDRESS}:8080/videos/64661ac56e2fe5c1c9ab9bd3/1684481431422755200/record_2.mp4`} /> */}

                {
                    eventDetailInfo?.detection_video_url ?
                        <VideoEvent video_url={eventDetailInfo.detection_video_url} />
                        :
                        ''
                }

                <View style={styles.editResponseButton}>
                    <Button title='Sửa' onPress={() => setDisabledResponse(false)}></Button>
                </View>
                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Báo động thật:</Text>
                    <View style={styles.eventDetailRight}>
                        <RadioButton.Group
                            onValueChange={value => setTrueAlarmRadio(value)}
                            value={trueAlarmRadio}
                        >
                            <View style={styles.trueAlarmArea}>
                                <Text style={styles.trueAlarmText}>True</Text>
                                <RadioButton disabled={disabledResponse} value="true" />
                            </View>
                            <View style={styles.trueAlarmArea}>
                                <Text style={styles.trueAlarmText}>False</Text>
                                <RadioButton disabled={disabledResponse} value="false" />
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Phản hồi:</Text>
                    <Text style={styles.eventDetailRight}></Text>
                </View>
                <TextInput
                    editable={!disabledResponse}
                    multiline
                    numberOfLines={4}
                    maxLength={60}
                    onChangeText={text => setEventComment(text)}
                    value={eventComment}
                    style={styles.commentInputArea}
                />

                {disabledResponse == true ?
                    ''
                    :
                    <View style={styles.commentConfirmCancelButton}>
                        <View style={styles.commentConfirm}>
                            <Button onPress={handleConfirmEditResponse} title='Xác nhận' />
                        </View>
                        <View style={styles.commentCancel}>
                            <Button onPress={handleCancelEditResponse} color='red' title='Hủy' />
                        </View>
                    </View>
                }

            </KeyboardAvoidingView>
        </ScrollView>
    );
}