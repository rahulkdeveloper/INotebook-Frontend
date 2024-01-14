import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AlertContext from '../context/alert/AlertContext';
import { useNavigate, } from 'react-router-dom';

const Notes = () => {
    const [editNote, setEditNote] = useState({ _id: null, etitle: "", edescription: "", etag: "" })
    const context = useContext(NoteContext);
    const { notes, loadAllNotes, updateNoteFunc } = context;
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        loadAllNotes()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        setEditNote({ _id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        ref.current.click()
    }

    const onChange = (e) => {
        setEditNote({ ...editNote, [e.target.name]: e.target.value });

    }
    const updateNoteApi = async (e) => {
        e.preventDefault()
        let updateData = { title: editNote.etitle, description: editNote.edescription, tag: editNote.etag }
        await updateNoteFunc(editNote._id, updateData);
        ref.current.click();
        showAlert("success", " Note updated successfully.")
    }

    return (
        <>

            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={editNote.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={editNote.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={editNote.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={editNote.etitle.length < 2 || editNote.edescription.length < 3 || editNote.etag.length < 2} type="button" className="btn btn-primary" onClick={updateNoteApi}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">

                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && "Notes not found."}
                </div>
                {notes.map((note, index) => {
                    return (<NoteItem key={index} note={note} updateNote={updateNote} />)
                })}
            </div>
        </>
    )
}

export default Notes
