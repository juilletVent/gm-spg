import styled from 'styled-components';

export const EditLayout = styled.div`
  padding: 16px;
`;

export const FormGroup = styled.div`
  outline: 1px solid #e9e9e9;
  padding: 10px 15px 0;
  border-radius: 0 0 5px 5px;

  &:not(:first-child) {
    margin-top: 25px;
  }
`;
export const GroupTitle = styled.h3`
  margin: -10px -15px 5px;
  padding: 5px 10px;
  background-color: #0080df;
  color: white;
  font-size: 16px;
`;
