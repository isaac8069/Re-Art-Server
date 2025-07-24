import React, { useEffect, useState } from 'react'
import apiUrl from '../apiConfig'


const Tag = (props) => {
    const [tags, setTags] = useState([])
    // const [tags, setTags] = useState(false)


    useEffect(() => {
    getTags()
    }, [])

    const getTags = () => {
    fetch(`${apiUrl}/tags`)
        .then(res => res.json())
        .then(foundTags => {
            console.log('Found Tags by INDEX', foundTags.tags)
            // foundTags.tags.map(t =>{
            //     console.log('What is T', t._id)
            //     console.log('THIS IS T NAME', t.name)
            // })
            setTags(foundTags.tags)
        })
        .catch(err => console.log(err))
    }

    const handleCheck = (e) => {
        console.log("CHECKED" ,handleCheck)
        setTags({ ...tags, [e.target.name]: e.target.checked })
    }

    const postTags = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: tags[0]._id,
            checked: Boolean(tags.name)
        }
        fetch(`${apiUrl}/tags`, {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(postedTags => {
            props.refreshTags()
            setTags({
                name: '',
                checked: false
            })
        })
        .catch(err => console.log(err))
    }

    return (
        <div>

            <h1>Test</h1>
            {
            tags.map(tag => (
                <li>
                    {tag.name}
                </li>
            ))
            }
            <form onSubmit={postTags}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="checkbox" name="name" id="name" onChange={handleCheck} value={tags ? 'checked' : ''} />
                </div>
                <input type="submit" value="Submit" />
            </form>
            
        </div>
    
    )
}

export default Tag