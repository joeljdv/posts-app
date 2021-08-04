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
        <div className="edit_form">
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
                <button type="submit" title="Post"><i class="fas fa-paper-plane"></i></button>
            </form>
            <button onClick={props.cancel} title="Cancel"><i className
                ="fas fa-times"></i></button>
        </div>
    )
}
export default EditPost