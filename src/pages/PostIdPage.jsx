import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/postService'
import Loader from '../components/UI/Loader/Loader'
import { useFitching } from '../hooks/userFitching'


const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFitching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFitching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Post number {params.id}</h1>
            {isLoading
                ? < Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Comments
            </h1>
            {isLoading
                ? < Loader />
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{ marginTop: 15 }}>
                            <h4>{comm.email}</h4>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage