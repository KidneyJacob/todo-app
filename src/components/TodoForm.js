import "./TodoForm.css"
import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'


// učebnice 3 - 28

const TodoForm = () => {
    const [todo, setTodo] = useState([])
    const [error, setError] = useState(false)

    // useState pro přidání úkolu
    const [newTodo, setNewTodo] = useState("")

    useEffect( () => {
        const unsubscribe = projectFirestore.collection("todo").onSnapshot( (snapshot) => {

            if (snapshot.empty) {
                setError("Nemáš žádné povinnosti.")                
            } else {
                let result = []
                snapshot.docs.forEach( (oneTodo) => {
                    result.push( {id: oneTodo.id, ...oneTodo.data()})
                })
                setTodo(result)
                setError("")
            }
        }, err => setError(err.message))

        return () => unsubscribe()
    }, [])

    const deleteTodo = (id) => {
        projectFirestore.collection("todo").doc(id).delete()
        setNewTodo("")
    }

    const submitForm = async (event) => {
        event.preventDefault()
    

    const newTask = {task: newTodo}

    try {
        await projectFirestore.collection("todo").add(newTask)
        
    } catch (err) {
        setError("Činost nebyla přidána" + err.message)
    }
    }


    return <section className='all-todo'>

        <form onSubmit={submitForm} className="form">
            <input 
                type="text"
                onChange={ (event) => setNewTodo(event.target.value) }
                placeholder="Add todo"
                value={newTodo}
                className="input" 
            />
            <input type="submit" value="Add" />
        </form>





    {error && <p>{error}</p>}
    {todo.map( (oneTodo) => {
        const {id, task} = oneTodo
        
        return <div key={id} className="one-todo">
            <p>{task}</p>
            <button onClick={ () => deleteTodo(id)}>OK</button>
        </div>
    })}

    </section>

   

}

export default TodoForm