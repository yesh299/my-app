import { useState } from "react";
import { Button, Form, Badge } from "react-bootstrap";

const UserChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hi! How can I help you today?", time: "10:30" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        sender: "user",
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      
      // Simulate admin response
      setTimeout(() => {
        const adminResponse = {
          sender: "admin",
          text: "Thank you for your message. A support agent will respond shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, adminResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000
        }}
      >
        {!isOpen && (
          <Button
            variant="primary"
            className="rounded-circle shadow"
            style={{ width: "60px", height: "60px", position: "relative" }}
            onClick={() => setIsOpen(true)}
          >
            <i className="bi bi-chat-dots" style={{ fontSize: "1.5rem" }}></i>
            <Badge
              bg="danger"
              pill
              style={{ position: "absolute", top: "0", right: "0" }}
            >
              1
            </Badge>
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="bg-white shadow-lg"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 1001,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-3 rounded-top d-flex justify-content-between align-items-center">
            <div>
              <strong>Customer Support</strong>
              <br />
              <small>We're here to help!</small>
            </div>
            <Button
              variant="link"
              className="text-white p-0"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-grow-1 p-3"
            style={{
              overflowY: "auto",
              backgroundColor: "#f8f9fa"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 d-flex ${
                  msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                  style={{
                    maxWidth: "80%",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  <p className="mb-0 small">{msg.text}</p>
                  <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                    {msg.time}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-top">
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
            >
              <i className="bi bi-send"></i> Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserChatComponent;