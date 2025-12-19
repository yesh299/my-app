import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = () => {
  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
      description: "Laptops, Phones, Tablets & More"
    },
    {
      name: "Books",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      description: "Best Selling Books & Novels"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6b1d?w=400&q=80",
      description: "Clothing, Shoes & Accessories"
    },
    {
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80",
      description: "Furniture, Appliances & Decor"
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
      description: "Fitness Equipment & Outdoor Gear"
    },
    {
      name: "Toys",
      image: "https://images.unsplash.com/photo-1587912781379-c797d3b1abca?w=400&q=80",
      description: "Games, Puzzles & Kids Items"
    }
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Shop by Category</h2>
      <Row>
        {categories.map((category, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={category.image}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&q=80";
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{category.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {category.description}
                </Card.Text>
                <LinkContainer
                  to={{
                    pathname: "/product-list",
                    search: `?category=${encodeURIComponent(category.name)}`
                  }}
                >
                  <Button variant="primary">Browse {category.name}</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryCardComponent;