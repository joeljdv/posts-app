import React,{useState, useEffect} from 'react'

const EditPost = (props) => {

    const [title, setTitle] = useState(props.post.title)
    const [content, setContent] = useState(props.post.content)


    const handleSubmit = (e) => {
        e.preventDefault()
        props.editPost({
            title: title,
            content: content
        })
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                type="text" 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br/>
                <label>Content:</label>
                <textarea id="content" 
                rows="5" cols="50"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}>
                </textarea>
                <br/>
                <input type="submit"/>
            </form>
            <button onClick={props.cancel}>cancel</button>
        </div>
    )
}
export default EditPost