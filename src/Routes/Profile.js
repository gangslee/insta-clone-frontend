import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import Avatar from '../Components/Avatar';

const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { userName: username } });
    if (loading) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      const {
        seeUser: {
          avatar,
          userName,
          fullName,
          isFollowing,
          isSelf,
          bio,
          followingCount,
          followersCount,
          postsCount,
          posts,
        },
      } = data;
      return (
        <>
          <Header>
            <HeaderColumn>
              <Avatar size="lg" url={avatar} />
            </HeaderColumn>
          </Header>
        </>
      );
    }
  }
);
