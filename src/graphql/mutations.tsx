`
mutation MyMutation($userToFollowId: ID = "", $_userId: ID = "") {
    updateUsers(
      update: {followers: {connect: {where: {node: {_id: $_userId}}}}}
      where: {_id: $userToFollowId}
    ) {
      users {
        followersAggregate {
          count
        }
        email
      }
    }
  }
  
  mutation addComment(
    $content: String = "test comment"
    $content_CONTAINS: String = "Bonjour test"
    $_id: ID = "03dc58ee-7c69-4eb8-b4f9-503fcc0361fe"
  ) {
    createComments(
      input: {
        author: { connect: { where: { node: { _id: $_id } } } }
        content: $content
        post: {
          connect: { where: { node: { content_CONTAINS: $content_CONTAINS } } }
        }
      }
    ) {
      comments {
        content
      }
    }
  }
  
  
  `;
