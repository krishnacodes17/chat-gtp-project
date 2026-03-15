import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/chat'

function ChatWindow({ messages, setMessages }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await axios.post(API_URL, {
        messages: updatedMessages,
      })
      const aiMessage = response.data.message
      setMessages([...updatedMessages, aiMessage])
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to get response'
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: `Error: ${errorMsg}`,
        isError: true,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-window">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default ChatWindow
