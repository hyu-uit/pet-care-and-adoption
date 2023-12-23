import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';

function BotMessageItem({ message, onActionClick }) {
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
            onPress={() => onActionClick(action.value)}
          >
            <Text style={{ ...FONTS.body5, color: COLORS.blackContent }}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

function ChatBox({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollViewRef = useRef(null);

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
        if (!resJson?.id) return;
        const watermark = resJson.id.split('|')[1];
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
            const _messages = resJson.activities;
            setMessages((prev) => [...prev, ..._messages]);
          });
      });
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }
  return (
    conversationId && (
      <View style={{ display: 'flex', flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
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
        </ScrollView>

        <View style={{ marginBottom: SIZES.bottomBarHeight }}>
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity onPress={() => handleSendMessage(inputValue)}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}
const BotService = () => {
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
  return <ChatBox conversationId={conversationId} />;
};
export default BotService;
export const TOKEN = 'dSx0OKtPQXM.TeM121P-aiAtJcl6cJNJ8iT3tjNMC3M-OZ0X2VuQLWw';
