import React, { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

function MessageList({ messages, isLoading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="welcome-screen">
        <h1>ChatGPT Clone</h1>
        <p>How can I help you today?</p>
        <div className="welcome-cards">
          <div className="welcome-card">
            <h3>💡 Examples</h3>
            <p>"Explain quantum computing in simple terms"</p>
          </div>
          <div className="welcome-card">
            <h3>⚡ Capabilities</h3>
            <p>Remembers what user said earlier in the conversation</p>
          </div>
          <div className="welcome-card">
            <h3>⚠️ Limitations</h3>
            <p>May occasionally generate incorrect information</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      {isLoading && (
        <div className="message-item assistant">
          <div className="message-content-wrapper">
            <div className="message-avatar ai-avatar-msg">AI</div>
            <div className="message-text">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
