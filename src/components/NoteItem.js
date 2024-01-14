import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/alert/AlertContext';

const NoteItem = (props) => {
    const { title, description, _id } = props.note;
    const { updateNote } = props;

    const context = useContext(NoteContext);
    const alertContext = useContext(AlertContext);
    const { deleteNote } = context;
    const { showAlert } = alertContext
    const deleteHandle = () => {
        deleteNote(_id);
        showAlert("success", " Note deleted successfully.")
    }


    return (
        <div className='col-md-3'>
            <div className="card my-3">

                <div className="card-body">
                    <div className="d-flex align-items-center">

                        <h5 className="card-title">{title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={deleteHandle}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => updateNote(props.note)}></i>
                    </div>
                    <p className="card-text">{description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
