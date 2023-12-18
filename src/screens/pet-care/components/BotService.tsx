import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

function BotMessageItem({ message, onActionClick }) {
    return (
        <View>
            <Text>Bot:</Text>
            <Text>{message.text}</Text>
            {message?.suggestedActions &&
                message.suggestedActions?.actions?.map((action, index) => (
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#f0f0f0', padding: 10 }} key={index} onPress={() => onActionClick(action.value)}>
                       <Text>
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
    }
    return (
        conversationId && (
            <View style={{display:"flex", flex:1}}>
                <ScrollView style={{flex:1}}>
                {messages.map((m, index) =>
                    m.isFromMe ? (
                        <Text key={index}>Me: {m.text}</Text>
                    ) : (
                        <BotMessageItem key={index} message={m} onActionClick={handleSendMessage} />
                    )
                )}

                </ScrollView>
             
                <View>
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
                        <Text>Send</Text></TouchableOpacity>
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
  return (

        <ChatBox conversationId={conversationId} />
  )
}
export default BotService
export const TOKEN = 'dSx0OKtPQXM.TeM121P-aiAtJcl6cJNJ8iT3tjNMC3M-OZ0X2VuQLWw';
