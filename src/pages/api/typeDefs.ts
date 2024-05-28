export const typeDefs = `
type User {
  _id: ID! @id
  username: String!
  firstName: String!
  lastName: String!
  email: String!
  emailVerified: DateTime! @timestamp(operations: [CREATE])
  password: String!
  avatar: String
  banner: String
  bio: String
  location: String
  job: String
  descText: String
  descLink: String
  followers: [User!]! @relationship(type: "FOLLOWS", direction: IN)
  following: [User!]! @relationship(type: "FOLLOWS", direction: OUT)
  blockedUser: [User!]! @relationship(type: "BLOCKS", direction: OUT)
  friends: [User]
  posts: [Post!]! @relationship(type: "POSTED", direction: OUT)
  hobbies: [Hobby!]! @relationship(type: "HAS_HOBBY", direction: OUT)
  projects: [Project!]! @relationship(type: "HAS_PROJECT", direction: OUT)
  loves: [Love!]! @relationship(type: "LOVES", direction: OUT)
  educations: [Education!]! @relationship(type: "HAS_STUDIED", direction: OUT)
  likes: [Post!]! @relationship(type: "LIKED", direction: OUT)
  events: [Event!]! @relationship(type: "ATTENDS", direction: OUT)
  groups: [Group!]! @relationship(type: "MEMBER_OF", direction: OUT)
  createdAt: DateTime! @timestamp(operations: [CREATE])
  account: [Account!]! @relationship(type: "HAS_ACCOUNT", direction: OUT)
  session: [Session!]! @relationship(type: "HAS_SESSION", direction: OUT)
  chats: [Chat!]! @relationship(type: "PARTICIPATES_IN", direction: OUT)
  notifications: [Notification!]! @relationship(type: "RECEIVES", direction: OUT)
}

type Account {
  id: ID!
  type: String
  Provider: String
  providerAccountId: String
  refresh_token: String
  access_token: String
  expires_at: Int
  token_type: String
  scope: String
  id_token: String
  session_state: String
}

type Session {
  id: ID!
  expires: DateTime @timestamp(operations: [CREATE])
  sessionToken: String
}

type VerificationToken {
  identifier: String
  token: String
  expires: DateTime @timestamp(operations: [CREATE])
}

type Post {
  id: ID! @id
  content: String!
  imageURL: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  author: User! @relationship(type: "POSTED", direction: IN)
  comments: [Comment!]! @relationship(type: "COMMENTED_ON", direction: IN)
  likes: [User!]! @relationship(type: "LIKED", direction: IN)
  tags: [Tag!]! @relationship(type: "TAGGED_WITH", direction: OUT)
}

type Tag {
  id: ID! @id
  name: String!
  posts: [Post!]! @relationship(type: "TAGGED_WITH", direction: IN)
}

type Comment {
  id: ID! @id
  content: String
  imageURL: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  post: Post! @relationship(type: "COMMENTED_ON", direction: OUT)
  author: User! @relationship(type: "WROTE", direction: OUT)
  comments: [Comment!]! @relationship(type: "COMMENTED_ON", direction: IN)
  likes: [User!]! @relationship(type: "LIKED", direction: IN)
}

type Hobby {
  id: Int!
  name: String!
  users: [User!]! @relationship(type: "HAS_HOBBY", direction: IN)
}

type Project {
  id: ID! @id
  name: String!
  startDate: Date!
  endDate: Date
  job: String!
  users: [User!]! @relationship(type: "HAS_PROJECT", direction: IN)
}

type Love {
  id: ID! @id
  name: String!
  category: String!
  iconUrl: String!
  users: [User!]! @relationship(type: "LOVES", direction: IN)
}

type Education {
  id: ID! @id
  name: String!
  level: String!
  users: [User!]! @relationship(type: "HAS_STUDIED", direction: IN)
}

type Event {
  id: ID! @id
  name: String!
  description: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  date: DateTime!
  location: String!
  eventImage: String
  attendees: [User!]! @relationship(type: "ATTENDS", direction: IN)
  posts: [Post!]! @relationship(type: "POSTED_IN", direction: IN)
}

type Group {
  id: ID! @id
  name: String!
  description: String!
  groupImage: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  members: [User!]! @relationship(type: "MEMBER_OF", direction: IN)
  posts: [Post!]! @relationship(type: "POSTED_IN", direction: IN)
}

type Chat {
  id: ID! @id
  name: String
  participants: [User!]! @relationship(type: "PARTICIPATES_IN", direction: IN)
  messages: [Message!]! @relationship(type: "SENT_IN", direction: OUT)
}

type Message {
  id: ID! @id
  content: String!
  imageUrl: String
  sender: User! @relationship(type: "SENT_BY", direction: OUT)
  chat: Chat! @relationship(type: "SENT_IN", direction: IN)
  createdAt: DateTime! @timestamp(operations: [CREATE])
}

type Notification {
  id: ID! @id
  type: NotificationType!
  createdAt: DateTime! @timestamp(operations: [CREATE])
  user: User! @relationship(type: "RECEIVES", direction: IN)
}

enum NotificationType {
  LIKE
  COMMENT
  FOLLOW
}

extend type User {
  recommendUserByHobby(limit: Int = 10, userId: ID!): [User!]!
    @cypher(
      statement: """
      MATCH (u:User {_id: $userId})-[:HAS_HOBBY]->(h:Hobby)
      WITH u, h
      MATCH (otherUser:User)-[:HAS_HOBBY]->(h)
      WHERE otherUser <> u
      RETURN DISTINCT otherUser LIMIT $limit
      """
      columnName: "otherUser"
    )
  recommendUserByFollow(limit: Int = 10, userId: ID!): [User!]!
    @cypher(
      statement: """
         MATCH (u:User {_id: $userId})-[:FOLLOWS]->(followed:User)-[:FOLLOWS]->(recommended:User)
      WHERE NOT (u)-[:FOLLOWS]->(recommended) AND recommended <> u
      RETURN DISTINCT recommended LIMIT $limit
      """
      columnName: "recommended"
    )
   
}

type Subscription {
  newNotification(userId: ID!): Notification!
}

  `;
