import React from 'react';
import { Button } from 'antd';
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

function View() {
  const { bizId } = useParams<{ bizId: string }>();
  console.log('bizId: ', bizId);

  const { goBack } = useHistory();

  return (
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
              <InfoLabel>信息项名称</InfoLabel>
              <InfoValue>信息项值</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>信息项名称信息项名称信息项名称信息项名称信息项名称信息项名称</InfoLabel>
              <InfoValue>
                信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>信息项名称信息项名称信息项名称信息项名称信息项名称信息项名称</InfoLabel>
              <InfoValue>
                信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值
              </InfoValue>
            </InfoItem>
          </GroupContent>
        </InfoGroup>
        <InfoGroup>
          <GroupTitle>第二组信息</GroupTitle>
          <GroupContent>
            <InfoItem>
              <InfoLabel>信息项名称</InfoLabel>
              <InfoValue>信息项值</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>信息项名称信息项名称信息项名称信息项名称信息项名称信息项名称</InfoLabel>
              <InfoValue>
                信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>信息项名称信息项名称信息项名称信息项名称信息项名称信息项名称</InfoLabel>
              <InfoValue>
                信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值信息项值
              </InfoValue>
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
  );
}

export default View;
