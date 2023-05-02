import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { RadioButton } from 'react-native-paper';
import { useEffect, useState } from "react";
import ImageModal from "react-native-image-modal";
import VideoView from "../VideoView";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentEvent, updateConfirmStatusEvent } from '../../reducers/eventReducer';

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
                    <Text style={styles.eventDetailLeft}>Hình ảnh:</Text>
                    <Text style={styles.eventDetailRight}></Text>
                </View>
                <TouchableOpacity style={styles.imageViewBlock}>
                    <ImageModal
                        resizeMode="contain"
                        style={{ width: 300, height: 300, }}
                        source={{ uri: 'https://media.istockphoto.com/id/621984692/photo/traffic-security-camera.jpg?s=612x612&w=0&k=20&c=w1TrTBvor2fNfBPxfFpuTm5fShzkuHgRoVVUJcTK1sA=', }}
                    />
                </TouchableOpacity>
                {/* <ImageModal
                    resizeMode="contain"
                    style={{ width: 200, height: 200, }}
                    source={{ uri: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg' }}
                /> */}
                {/* <Image style={{ width: 200, height: 200, marginLeft: 7 }}
                    source={{ uri: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg' }} /> */}

                <View style={styles.eventDetailBlock}>
                    <Text style={styles.eventDetailLeft}>Video:</Text>
                    <Text style={styles.eventDetailRight}></Text>
                </View>
                <VideoView video_url={'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'} />


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