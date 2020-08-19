import { gql } from '@apollo/client';

const GET_NEW_POSTS = gql`
  query getNewPosts ($limit: Int, $offset: Int) {
    comments_aggregate(limit: $limit, offset: $offset, order_by: { id: desc }) {
      nodes{
        comment_id
        content
        created_at
      }
    }
  }
`;

export default GET_NEW_POSTS;
