const {Router} = require('express')

const {
	createPost,
	getCatPosts,
	getPosts,
	getPost,
	getUserPosts,
	editPost,
	deletePost
} = require('../controllers/postContorllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware, createPost)
router.get('/categories/:category', getCatPosts)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/users/:id', getUserPosts)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)


module.exports = router