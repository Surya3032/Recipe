import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  text-align: center;
  padding: 50px 0;
  color: clack;
`;

const FeatureBox = styled(Col)`
  text-align: center;
  margin-bottom: 30px;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

function Home() {
    return (
        <StyledContainer>
            <h1>Recipe Management System</h1>
            <p>Store, organize, and discover your favorite recipes all in one place.</p>
            <Button as={Link} to="/recipes" variant="primary" className="mx-2">Browse Recipes</Button>
            <Button as={Link} to="/add-recipe" variant="success" className="mx-2">Add New Recipe</Button>

            <h2 className="mt-5">Latest Recipes</h2>
            <p>Failed to fetch</p> {/* Replace with actual data fetching */}

            <h2 className="mt-5">Features</h2>
            <Row>
                <FeatureBox md={4}>
                    <FeatureIcon>➕</FeatureIcon>
                    <h3>Add Recipes</h3>
                    <p>Easily add your favorite recipes with ingredients.</p>
                </FeatureBox>
                <FeatureBox md={4}>
                    <FeatureIcon>🔍</FeatureIcon>
                    <h3>Find Recipes</h3>
                    <p>Quickly find recipes by name, category, or ingredients.</p>
                </FeatureBox>
                <FeatureBox md={4}>
                    <FeatureIcon>📝</FeatureIcon>
                    <h3>Edit & Organize</h3>
                    <p>Update recipes as needed and keep them organized.</p>
                </FeatureBox>
            </Row>
        </StyledContainer>
    );
}

export default Home;