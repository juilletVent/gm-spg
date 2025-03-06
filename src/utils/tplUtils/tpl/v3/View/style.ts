import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
`;

export const Title = styled.h2``;

export const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export const FooterLayout = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid #e9e9e9;
  gap: 5px;
  button {
    min-width: 120px;
  }
`;

export const ContentLayout = styled.div``;
export const InfoGroup = styled.div`
  padding-block: 16px;
  & + & {
    border-top: 1px dashed #e9e9e9;
  }
`;
export const GroupTitle = styled.h3``;
export const GroupContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 10px;
`;
export const InfoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;
export const InfoLabel = styled.div`
  color: gray;
  min-width: 100px;
  max-width: 150px;
  &::after {
    content: '：';
  }
`;
export const InfoValue = styled.div`
  color: #333;
`;
export const DetailLayout = styled.div`
  padding: 16px;
`;
