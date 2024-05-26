import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';
import {Symbol} from './components/Symbol';
import {Board} from './components/Board';
import {Register} from './components/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Container, Row, Col } from 'react-bootstrap';

import './styles.css'

function App() {
    return (
        <div className="AppMain">
            <Container className="text-center centeredX">
                <Row className="align-items-center">
                    <Col lg={12} className="text-white">
                        <Router>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/symbol" element={<Symbol />} />
                            <Route path="/game" element={<Board />} />
                            <Route path="/register" element={<Register />} />
                          </Routes>
                        </Router>
                    </Col>
                </Row>
            </Container>
        </div>
  )
}

export default App