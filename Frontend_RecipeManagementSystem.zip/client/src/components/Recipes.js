/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/actions/recipeActions';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const RecipeCard = styled(Card)`
  margin-bottom: 20px;
`;

function Recipes() {
  const recipes = useSelector((state) => state.recipes.recipes); // Correct path
  const loading = useSelector((state) => state.recipes.loading);
  const error = useSelector((state) => state.recipes.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <StyledContainer>
      <h1>Recipes</h1>
      <Row>
        {recipes.map((recipe) => (
          <Col md={6} lg={4} key={recipe.id}>
            <RecipeCard>
              <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/recipe-placeholder.jpg`} />
              <Card.Body>
                <Card.Title>
                  <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </Card.Title>
                <Card.Text>{recipe.description.substring(0, 100)}...</Card.Text>
                <Button variant="danger" size="sm" className="float-end">Delete</Button>
              </Card.Body>
            </RecipeCard>
          </Col>
        ))}
      </Row>
      <Link to="/add-recipe">Add Recipe</Link>
    </StyledContainer>
  );
}

export default Recipes;