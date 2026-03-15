import React from 'react'

function MessageItem({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`message-item ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-content-wrapper">
        <div className={`message-avatar ${isUser ? 'user-avatar-msg' : 'ai-avatar-msg'}`}>
          {isUser ? 'U' : 'AI'}
        </div>
        <div className={`message-text ${message.isError ? 'error-message' : ''}`}>
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
