import React, { useEffect, useRef, useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../styles/App.css';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/myModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/userPost';
import PostService from '../API/postService';
import Loader from '../components/UI/Loader/Loader';
import { useFitching } from '../hooks/userFitching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoadind, postError] = useFitching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoadind, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page => {
        setPage(page)
    })

    return (
        <div className="app">
            {/* <button onClick={fetchPosts}>Get Posts</button> */}
            <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
                Create new post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <div style={{ marginTop: 5 }}>
                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue="Number of items per page"
                    options={[
                        { value: 5, name: '5' },
                        { value: 15, name: '15' },
                        { value: 25, name: '25' },
                        { value: -1, name: 'show all' }
                    ]}
                />
            </div>
            {postError &&
                <h1>Error: {postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts JavaScript" />
            <div ref={lastElement}>
                <Loader />
            </div>
            {isPostsLoadind &&
                < div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div >
    )
}
export default Posts;