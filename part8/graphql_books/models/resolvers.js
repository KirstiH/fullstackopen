const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./user')
const Book = require('./book')
const Author = require('./author')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    },
    allBooks: async (root, args) => {
        // filters missing
        return Book.find({})
    },
      allAuthors: async (root, args) => {
        const authors = await Author.find({})
        const populatedBooks = await Book.find({}).populate('author')

        const result = authors.map(author => {
          const count = populatedBooks.filter(book => book.author.name === author.name).length
          return {
            name: author.name,
            born: author.born,
            bookCount: count
          }
        })

        return result
    },
  },
  Mutation: {
      addBook: async (root, args, context) => {
        const checkBook = await Book.findOne({ title: args.title })
        if (checkBook) {
          throw new GraphQLError('Book title must be unique', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
        }
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          try {
            author = new Author({ name: args.author })
            await author.save()
          } catch (error) {
             throw new GraphQLError('Author name must be at least 4 characters long ', {
              extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
          }
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        })
        try {
          const savedBook = await book.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
          return savedBook.populate('author') 
        } catch (error) {
          throw new GraphQLError('Saving book failed, title must be at least 5 characters long', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.born
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })

          if ( !user || args.password !== 'secret' ) {
            throw new GraphQLError('wrong credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })        
          }

          const userForToken = {
            username: user.username,
            id: user._id,
          }

          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return author
    }
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
  
}


module.exports = resolvers