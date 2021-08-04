import React, {useState} from 'react'

const AddPostForm = (props) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



    const handleSubmit = (e) => {
      e.preventDefault()
      props.addPost({
          title: title,
          content: content
      })
    }

    return (
        <div className="add_form">
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
                <input className="form submit" type="submit"/>
                <div className="form cancel" onClick={props.cancel} title="Cancel"><i className
                ="fas fa-times"></i></div>
            </form>
        </div>
    )
}

export default AddPostForm