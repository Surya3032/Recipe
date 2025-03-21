import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';

import Home from './components/Home';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';

const StyledContainer = styled(Container)`
  padding: 20px;
  color: black;
  min-height: calc(100vh - 56px); // Adjust for navbar height
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  background-image: url('${process.env.PUBLIC_URL}new1.jpg'); // Replace with your image
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

function App() {
    return (
        <Provider store={store}>
            <AppWrapper>
                <Router>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/">🍴 Recipe Management</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                                    <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <StyledContainer>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipes" element={<Recipes />} />
                            <Route path="/add-recipe" element={<AddRecipe />} />
                            <Route path="/recipe/:id" element={<RecipeDetails />} />
                        </Routes>
                    </StyledContainer>
                </Router>
            </AppWrapper>
        </Provider>
    );
}

export default App;