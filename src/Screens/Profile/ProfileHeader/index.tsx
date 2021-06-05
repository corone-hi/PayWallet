import React from 'react';
import Styled from 'styled-components/native';

import Button from '~/Components/Button';

const Container = Styled.View`
  flex-direction: row;
`;
const ProfileImageContainer = Styled.View`
  padding: 16px;
`;
const ProfileImage = Styled.Image`
  border-radius: 100px;
`;
const ProfileContent = Styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-around;
`;
const LabelContainer = Styled.View`
  flex-direction: row;
`;

const ProfileItem = Styled.View`
  flex: 1;
  align-items: center;
`;
const LabelCount = Styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const LabelTitle = Styled.Text`
  font-weight: 300;
`;
interface Props {
  //image: string;
  name: string;
}

const ProfileHeader = ({name}: Props) => {
  return (
    <Container>
      <ProfileImageContainer>
        <ProfileImage
          source={require('~/Assets/Images/ic_profile.png')}
          style={{width: 70, height: 70}}
        />
      </ProfileImageContainer>
      <ProfileContent>
        <LabelContainer>
          <ProfileItem>
            <LabelCount>{name}</LabelCount>
          </ProfileItem>
        </LabelContainer>
        <Button
          label="프로필 수정"
          style={{
            borderRadius: 4,
            backgroundColor: '#FEFFFF',
            borderWidth: 1,
            borderColor: '#D3D3D3',
            height: 20,
          }}
          color="#292929"
        />
      </ProfileContent>
    </Container>
  );
};

export default ProfileHeader;
