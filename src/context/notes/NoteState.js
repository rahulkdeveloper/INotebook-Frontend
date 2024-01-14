import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const startingNotes = [];
    const url = "http://localhost:8000"
    const [notes, setNotes] = useState(startingNotes);

    // Load all notes...
    const loadAllNotes = async () => {
        const token = localStorage.getItem("token");


        const response = await fetch(`${url}/api/notes/load-notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        });
        const data = await response.json();

        if (data.data) {

            setNotes(data.data)
        }
        else {
            setNotes([])
        }
    }

    // Add note...
    const addNote = async (data) => {
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/api/notes/add-notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        setNotes([...notes, json.data])
    }

    // Delete a note...
    const deleteNote = async (id) => {
        const token = localStorage.getItem("token")
        await fetch(`${url}/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        });

        let newNotes = notes.filter((i) => { return i._id.toString() !== id.toString() });
        setNotes(newNotes);

    }

    //update a note...
    const updateNoteFunc = async (id, updateData) => {
        const token = localStorage.getItem("token")
        let response = await fetch(`${url}/api/notes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(updateData)
        });
        const jsonData = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        newNotes = newNotes.map((item) => {
            if (item._id.toString() === jsonData.data._id.toString()) {
                item = jsonData.data;
            }
            return item
        })
        setNotes(newNotes)
    }



    return (
        <NoteContext.Provider value={{ notes, loadAllNotes, addNote, deleteNote, updateNoteFunc }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState