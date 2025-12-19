import { Container, Row, Col, ListGroup, Card, Form, Button, Badge } from "react-bootstrap";
import { useState } from "react";

const AdminChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      user: "John Doe",
      lastMessage: "I need help with my order",
      timestamp: "2024-01-15 14:30",
      unread: 2
    },
    {
      id: 2,
      user: "Jane Smith",
      lastMessage: "When will my product arrive?",
      timestamp: "2024-01-15 13:15",
      unread: 1
    },
    {
      id: 3,
      user: "Mike Johnson",
      lastMessage: "Thank you for your help!",
      timestamp: "2024-01-15 10:00",
      unread: 0
    }
  ];

  const chatMessages = {
    1: [
      { sender: "user", message: "I need help with my order", time: "14:30" },
      { sender: "user", message: "Order #123456", time: "14:31" },
      { sender: "admin", message: "Hello! I'll help you with that. Let me check your order.", time: "14:32" }
    ],
    2: [
      { sender: "user", message: "When will my product arrive?", time: "13:15" },
      { sender: "admin", message: "Your order is currently being shipped and should arrive in 2-3 business days.", time: "13:20" }
    ],
    3: [
      { sender: "user", message: "I have a question about the product", time: "09:30" },
      { sender: "admin", message: "Sure, I'm here to help. What would you like to know?", time: "09:35" },
      { sender: "user", message: "Thank you for your help!", time: "10:00" }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage("");
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Customer Support Chats</h1>
      <Row style={{ height: "600px" }}>
        <Col md={4} className="border-end">
          <h5 className="mb-3">Conversations</h5>
          <ListGroup>
            {chats.map((chat) => (
              <ListGroup.Item
                key={chat.id}
                action
                active={selectedChat === chat.id}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{chat.user}</strong>
                    <p className="mb-1 text-muted small">{chat.lastMessage}</p>
                    <small className="text-muted">{chat.timestamp}</small>
                  </div>
                  {chat.unread > 0 && (
                    <Badge bg="danger" pill>
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={8}>
          {selectedChat ? (
            <>
              <Card className="mb-3" style={{ height: "450px" }}>
                <Card.Header>
                  <strong>
                    Chat with {chats.find((c) => c.id === selectedChat)?.user}
                  </strong>
                </Card.Header>
                <Card.Body style={{ overflowY: "auto" }}>
                  {chatMessages[selectedChat]?.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-3 d-flex ${
                        msg.sender === "admin" ? "justify-content-end" : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded ${
                          msg.sender === "admin"
                            ? "bg-primary text-white"
                            : "bg-light"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        <p className="mb-0">{msg.message}</p>
                        <small className="text-muted">{msg.time}</small>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <i className="bi bi-send"></i> Send Message
              </Button>
            </>
          ) : (
            <div className="text-center text-muted mt-5">
              <i className="bi bi-chat-dots" style={{ fontSize: "3rem" }}></i>
              <p className="mt-3">Select a conversation to start chatting</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminChatsPage;
