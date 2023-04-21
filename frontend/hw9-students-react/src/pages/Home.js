import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Home(){
    return(
        <Card style={{ width: '12rem' }}>
  <Card.Img
    variant="top"
    src="joker.jpeg"
    style={{ width: '120px', height: '150px', objectFit: 'cover' }}
    className="mx-auto d-block"
  />
  <Card.Body className="text-center">
    <Card.Title style={{ fontSize: '1rem', lineHeight: '1.2' }}>Card Title</Card.Title>
    <Card.Text style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

      

    )
}