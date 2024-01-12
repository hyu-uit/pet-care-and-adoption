import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAge,
  changeGender,
  changeType,
} from '../../../store/bot-chat/bot-chat.slice';
import { SEX } from '../../../types/enum/sex.enum';
import { RootState } from '../../../store';
import { useGetPostByBotMutation } from '../../../store/post/post.api';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../../navigators/AppRoute';

function BotMessageItem({ message, onActionClick }) {
  const dispatch = useDispatch();
  const botData = useSelector((state: RootState) => state.botChat);
  const [getPostByBot, { isLoading }] = useGetPostByBotMutation();
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: scaleSize(20),
        backgroundColor: COLORS.primary,
        borderRadius: scaleSize(10),
      }}
    >
      {/* <Text style={{ ...FONTS.body3, color: COLORS.whitePrimary }}>Bot:</Text> */}
      <Image
        source={IMAGES.BOT_AVATAR}
        style={{
          width: scaleSize(30),
          height: scaleSize(30),
          borderRadius: scaleSize(15),
        }}
      />
      <Text style={{ ...FONTS.body3, color: COLORS.whitePrimary }}>
        {message.text}
      </Text>
      {message?.suggestedActions &&
        message.suggestedActions?.actions?.map((action, index) => (
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: '#f0f0f0',
              padding: 10,
              borderRadius: scaleSize(5),
            }}
            key={index}
            onPress={() => {
              if (message.text.includes('Which one you want me to find?')) {
                dispatch(changeType(action.value));
              }
              if (message.text.includes('Please choose one?')) {
                if (action.value === 'Male') {
                  dispatch(changeGender(SEX.MALE));
                } else {
                  dispatch(changeGender(SEX.FEMALE));
                }
              }
              onActionClick(action.value);
            }}
          >
            <Text style={{ ...FONTS.body5, color: COLORS.blackContent }}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      {message.text.includes('Great!') && (
        <TouchableOpacity
          onPress={async () => {
            try {
              const res = await getPostByBot({
                userID: myPhoneNumber,
                species: botData.type,
                sex: botData.gender,
                age: botData.age,
              }).unwrap();

              console.log(res);

              if (res) {
                const data = {
                  images: res?.images,
                  age: res?.postAdoptModel.age,
                  breed: res?.postAdoptModel.breed,
                  description: res?.postAdoptModel.description,
                  district: res?.postAdoptModel.district,
                  isAdopt: res?.postAdoptModel.isAdopt,
                  isDone: res?.postAdoptModel.isDone,
                  isVaccinated: res?.postAdoptModel.isVaccinated,
                  petName: res?.postAdoptModel.petName,
                  postID: res?.postAdoptModel.postID,
                  province: res?.postAdoptModel.province,
                  receiverID: res?.postAdoptModel.receiverID,
                  sex: res?.postAdoptModel.sex,
                  species: res?.postAdoptModel.species,
                  userID: res?.postAdoptModel.userID,
                  weight: res?.postAdoptModel.weight,
                };

                navigation.navigate(SCREEN.PET_DETAIL, { postData: data });
              } else {
                navigation.navigate('Adoption');
              }
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          }}
          style={{
            width: '100%',
            padding: scaleSize(15),
            backgroundColor: COLORS.secondary,
            alignSelf: 'center',
            marginTop: scaleSize(20),
            borderRadius: scaleSize(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.whitePrimary} />
          ) : (
            <Text style={{ ...FONTS.h5, color: COLORS.whitePrimary }}>
              Click here to see post!
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

function ChatBox({ conversationId, setConversationId }) {
  const [messages, setMessages] = useState([]);
  const [watermarkCurrent, setWatermarkCurrent] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  function createNewConversation() {
    fetch('https://directline.botframework.com/v3/directline/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setConversationId(resJson?.conversationId);
        setMessages([]); // Clear existing messages when creating a new conversation
      });
  }

  const scrollViewRef = useRef(null);
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  useEffect(() => {
    // Scroll to the end when the component mounts or when new messages are added
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }, [messages]);

  function handleSendMessage(value) {
    setMessages((prev) => [
      ...prev,
      {
        isFromMe: true,
        text: value,
      },
    ]);
    fetch(
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + TOKEN,
        },
        body: JSON.stringify({
          locale: 'en-EN',
          type: 'message',
          from: {
            id: 'user1',
          },
          text: value,
        }),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        setInputValue('');
        if (resJson) {
          const watermarkNew = resJson?.id?.split('|')[1];
          const watermark = watermarkNew ?? watermarkCurrent;
          fetch(
            `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities?watermark=${watermark}`,
            {
              headers: {
                Authorization: 'Bearer ' + TOKEN,
              },
            }
          )
            .then((res) => res.json())
            .then((resJson) => {
              console.log(resJson);
              const _messages = resJson.activities;
              if (!watermarkNew) {
                setMessages((prev) => [
                  ...prev,
                  ...[_messages[_messages.length - 1]],
                ]);
              } else {
                setMessages((prev) => [...prev, ..._messages]);
                setWatermarkCurrent(watermark);
              }
            });
        }
      });
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }
  return (
    conversationId && (
      <View
        style={{
          display: 'flex',
          flex: 1,
          paddingTop: 20,
          backgroundColor: COLORS.background,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scaleSize(20),
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name='chevron-back'
              size={24}
              style={{ marginLeft: scaleSize(16) }}
              color='black'
            />
          </TouchableOpacity>
          {messages.length > 0 && (
            <TouchableOpacity
              onPress={async () => {
                await createNewConversation();
                setMessages([]);
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'right',
                  // marginTop: scaleSize(20),
                  textDecorationLine: 'underline',
                  color: COLORS.primary,
                }}
              >
                Create new Chat
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {messages.length <= 0 && (
          <TouchableOpacity
            onPress={() => {
              handleSendMessage('Hi there!');
            }}
            style={{
              width: '70%',
              padding: scaleSize(15),
              backgroundColor: COLORS.secondary,
              alignSelf: 'center',
              marginTop: scaleSize(20),
              borderRadius: scaleSize(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.whitePrimary }}>
              Start chatting
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            style={{
              flex: 1,
              paddingBottom: SIZES.bottomPadding,
              paddingHorizontal: 16,
              backgroundColor: COLORS.background,
            }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}
          >
            {messages.map((m, index) =>
              m.isFromMe ? (
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: COLORS.tertiary,
                    padding: scaleSize(20),
                    marginVertical: scaleSize(20),
                    borderRadius: scaleSize(10),
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    key={index}
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      marginRight: scaleSize(5),
                    }}
                  >
                    {m.text}
                  </Text>
                  <Image
                    source={IMAGES.PET_USER}
                    style={{
                      width: scaleSize(30),
                      height: scaleSize(30),
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              ) : (
                <BotMessageItem
                  key={index}
                  message={m}
                  onActionClick={handleSendMessage}
                />
              )
            )}
            <View style={{ paddingBottom: SIZES.bottomPadding * 2 }}></View>
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignSelf: 'center',
              paddingHorizontal: 10,
              backgroundColor: COLORS.background,
              paddingTop: 4,
            }}
            keyboardVerticalOffset={28}
          >
            {messages.length > 0 && (
              <View
                style={{
                  // marginBottom: SIZES.bottomBarHeight,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: scaleSize(10),
                  paddingBottom: 40,
                }}
              >
                <TextInput
                  style={{
                    borderColor: COLORS.secondary,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    flex: 1,
                    backgroundColor: COLORS.background,
                  }}
                  value={inputValue}
                  onChangeText={handleInputChange}
                />
                <TouchableOpacity
                  onPress={() => {
                    console.log(messages[messages.length - 1].text);
                    if (
                      messages[messages.length - 1].text.includes(
                        'Please tell me the age of pet you want'
                      ) ||
                      messages[messages.length - 1].text.includes(
                        'Please enter number only'
                      )
                    ) {
                      console.log(parseInt(inputValue));
                      if (parseInt(inputValue) > 0) {
                        dispatch(changeAge(parseInt(inputValue)));
                      }
                    }
                    handleSendMessage(inputValue);
                  }}
                >
                  <FontAwesome
                    name='send'
                    size={scaleSize(20)}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  );
}
const BotService = (isNew: boolean) => {
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    fetch('https://directline.botframework.com/v3/directline/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setConversationId(resJson?.conversationId);
      });
  }, []);
  return (
    <ChatBox
      conversationId={conversationId}
      setConversationId={setConversationId}
    />
  );
};
export default BotService;
export const TOKEN = 'dSx0OKtPQXM.TeM121P-aiAtJcl6cJNJ8iT3tjNMC3M-OZ0X2VuQLWw';
