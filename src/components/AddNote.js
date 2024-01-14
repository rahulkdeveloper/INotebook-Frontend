import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/alert/AlertContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const alertContext = useContext(AlertContext);
    const { addNote } = context;
    const { showAlert } = alertContext
    const [note, setNote] = useState({ title: "", description: "", tag: "" });


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note);
        showAlert("success", "Note addedd successfully.")
        setNote({ title: "", description: "", tag: "" });

    }

    return (

        < div >
            <div className="container" style={{ marginTop: "60px" }}>
                <h2 className='my-3'>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />


                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>

                    <button disabled={note.title.length < 2 || note.description.length < 3 || note.tag.length < 2} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div >
    )
}

export default AddNote
