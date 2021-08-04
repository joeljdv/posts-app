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
        <div className="comment_form">
            <div className="comment_form 2">
                <form className="comment_form" onSubmit={handleSubmit}>
                    <textarea id="content" 
                    rows="1" cols=""
                    onChange = {(e) => setContent(e.target.value)}
                    value = {content}
                    placeholder="Comment...">
                    </textarea>
                    <div className="comment_form submit2">
                        <button type="submit"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CommentForm