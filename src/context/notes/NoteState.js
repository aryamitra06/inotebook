import NoteContext from "./NoteContext";

// defining the state
const NoteState = (props) =>{
    const state = {
        "name": "Aryamitra",
        "class": "10"
    }
    return (
        <NoteContext.Provider value = {state}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;