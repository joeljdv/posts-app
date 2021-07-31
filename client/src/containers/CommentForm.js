import React, {useState} from 'react'

const CommentForm = (props) => {
    const [content, setContent] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addComment({
            content: content
        })
        setContent("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea id="content" 
                rows="3" cols="40"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}>
                </textarea>
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}
export default CommentForm