import React from 'react';
import { Button, Spin } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import {
  BtnGroup,
  ContentLayout,
  DetailLayout,
  FooterLayout,
  GroupContent,
  GroupTitle,
  InfoGroup,
  InfoItem,
  InfoLabel,
  InfoValue,
  PageHeader,
  Title,
} from './style';
import { usePageData } from '../Edit/dataHandle';

function View() {
  const { bizId } = useParams<{ bizId: string }>();
  console.log('bizId: ', bizId);

  const { pageData, loading } = usePageData();

  console.log('pageData: ', pageData);

  const { goBack } = useHistory();

  return (
    <Spin spinning={loading}>
      <DetailLayout>
        <PageHeader>
          <Title>详细页面页头标题</Title>
          <BtnGroup>
            <Button type="primary" icon="rollback" onClick={goBack}>
              返回
            </Button>
          </BtnGroup>
        </PageHeader>
        <ContentLayout>
          <InfoGroup>
            <GroupTitle>第一组信息</GroupTitle>
            <GroupContent>
              <InfoItem>
                <InfoLabel>信息项名称1</InfoLabel>
                <InfoValue>{pageData?.fieldKey1}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>信息项名称2</InfoLabel>
                <InfoValue>{pageData?.fieldKey2}</InfoValue>
              </InfoItem>
            </GroupContent>
          </InfoGroup>
          <InfoGroup>
            <GroupTitle>第二组信息</GroupTitle>
            <GroupContent>
              <InfoItem>
                <InfoLabel>信息项名称1</InfoLabel>
                <InfoValue>{pageData?.fieldKey1}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>信息项名称2</InfoLabel>
                <InfoValue>{pageData?.fieldKey2}</InfoValue>
              </InfoItem>
            </GroupContent>
          </InfoGroup>
        </ContentLayout>
        <FooterLayout>
          <Button type="primary" icon="rollback" onClick={goBack}>
            返回
          </Button>
        </FooterLayout>
      </DetailLayout>
    </Spin>
  );
}

export default View;
