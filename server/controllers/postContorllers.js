const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')

// CREATE A POST
// POST: api/posts
const createPost = async (req, res, next) => {
	try {
		let {title, category, description} = req.body;
		if (!title || !category || !description || !req.files) {
			return next(new HttpError("Fill in all fields and choose thumbnail", 422))
		}

		const {thumbnail} = req.files

		if (thumbnail.size > 200000) {
			return next(new HttpError("Thumbnail too big. File should be less than 2mb"))
		}
		let fileName = thumbnail.name;
		let splittedFileName = fileName.split('.')
		let newFilename = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1]
		thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async err => {
			if (err) {
				return next(new HttpError(err))
			} else {
				const newPost = await Post.create({
					title,
					category,
					description,
					thumbnail: newFilename,
					creator: req.user.id
				});
				if (!newPost) {
					return next(new HttpError("Post couldn't be created"))
				}
				const currentUser = await User.findById(req.user.id)
				const userPostCount = currentUser.posts + 1;
				await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

				res.status(201).json(newPost)
			}
		})

	} catch (err) {
		return next(new HttpError(err))
	}
}


// Get all POSTs
// Get: api/posts
const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().sort({updateAt: -1})
		res.status(200).json(posts)
	} catch (err) {
		return next(new HttpError(err))
	}
}


// Get A POST
// POST: api/posts/:id
const getPost = async (req, res, next) => {
	try {
		const {id} = req.params
		const post = await Post.findById(id)
		if (!post) {
			return next(new HttpError("Post not found", 404))
		}
		res.status(200).json(post)
	} catch (err) {
		return next(new HttpError(err))
	}
}


// Get POSTS BY CATEGORY
// POST: api/posts/categories/:category
const getCatPosts = async (req, res, next) => {
	try {
		const {category} = req.params
		const catPost = await Post.find({category}).sort({createdAt: -1})
		if (!catPost) {
			return next(new HttpError("Category not found", 404))
		}
		res.status(200).json(catPost)
	} catch (err) {
		return next(new HttpError(err))
	}
}

// GET AUTHOR POST
// POST: api/posts/users/:id
const getUserPosts = async (req, res, next) => {
	try {
		const {id} = req.params;
		const posts = await Post.find({creator: id}).sort({createAt: -1})
		res.status(200).json(posts)
	} catch (err) {
		return next(new HttpError(err))
	}
}

// EDIT POST
// PATCH: api/posts/:id
const editPost = async (req, res, next) => {
	try {
		let fileName;
		let newFileName;
		let updatedPost;
		const postId = req.params.id
		let {title, category, description} = req.body

		if (!title || !category || !description) {
			return next(new HttpError("Fill in all fields", 422))
		}

		if (!req.file) {
			updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
		} else {
			const oldPost = await Post.findById(postId)
			fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
				if (err) {
					return next(new HttpError(err))
				}
				const {thumbnail} = req.files

				if (thumbnail.size > 200000) {
					return next(new HttpError("Thumbnail too big. Should be less than 2mb!"))
				}

				fileName = thumbnail.name;
				let splittedFilename = fileName.split('.')
				newFileName = splittedFilename[0] + uuid() + splittedFilename[splittedFilename.length - 1]
				thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
					if (err) {
						return next(new HttpError(err))
					}
				})

				updatedPost = await Post.findByIdAndUpdate(postId, {
					title,
					category,
					description,
					thumbnail: newFileName
				}, {new: true})
			})
		}
		if (!updatedPost) {
			return next(new HttpError('Couldn`t update post', 422))
		}
		res.status(200).json(updatedPost)

	} catch (err) {
		return next(new HttpError(err))
	}
}

// Delete POST
// DELETE: api/posts/:id
const deletePost = async (req, res, next) => {
	try {
		const {id} = req.params;

		if (!id) {
			return next(new HttpError('Couln`t find this post', 400))
		}
		const post = await Post.findById(id)
		const fileName = post?.thumbnail;
		if(req.user.id == post.creator) {


			fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async err => {
				if (err) {
					return next(new HttpError(err))
				} else {
					await Post.findByIdAndDelete(id)
					const currentUser = await User.findById(req.user.id);
					const userPostCount = currentUser?.posts - 1;
					await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
					res.json(`The post ${id} deleted successfully!`)
				}
			})
		} else {
			return next(new HttpError("Post couldn't be deleted", 403))
		}
	} catch (err) {
		next(new HttpError(err))
	}
}

module.exports = {createPost, getCatPosts, getPosts, getPost, getUserPosts, editPost, deletePost}
