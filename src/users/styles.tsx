// import React from 'react';
import styled from "styled-components";

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
`;

export const OverLay = styled.div`
  display: flex;
  
  text-align: center;
  min-height: 100vh;
  position: absolute;
  width: auto;
  height: auto;
  background-color: white;
  border: 1px solid #ccc!important;
`