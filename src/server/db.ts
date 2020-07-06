type Db = {
  users: User[]
  messages: Message[]
}

type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

type Message = {
  id: string
  userId: string
  body: string
  createdAt: number
}

const db: Db = {
  users: [
    { id: '1', name: 'Alex', email: 'alex@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '2', name: 'Marcus', email: 'marcus@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '3', name: 'Maria', email: 'maria@gmail.com', avatarUrl: 'https://gravatar.com/123' },
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hello culiauuu', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'pero vevo wachen', createdAt: Date.now() },
  ]
}

export default db;