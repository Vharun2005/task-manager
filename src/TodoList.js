import React, { useEffect, useState } from 'react'
import './todolist.css'
import { IoMdAdd } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


const TodoList = ({tasksarr,setTaskarr,Search,Setsearch}) => {
    const [selectedOption,setselectedoption] = useState('')
    const Priority_Values = {
        High: 3,
        Medium:2,
        Low:1
    }
    const[tasks,setTasks] = useState('')

    useEffect(() => {
        const fetchTasks = () => {
            const recievedTaskArr = localStorage.getItem('usertasks')
            if (recievedTaskArr) {
                const changedArr = JSON.parse(recievedTaskArr)
                const sortedArr = changedArr.sort((a,b)=> b.PriorityValue - a.PriorityValue)
                setTaskarr(sortedArr); 
            } else {
                setTaskarr([]); 
            }
        }
        fetchTasks()
    },[])
    const addOption = (e) => {
        setselectedoption(e)
    }
    const AddTask = async() => {

        if(tasks.trim() === ''){
            return toast('Empty Input cannot be add in list')

        }
        const id = tasksarr.length ? tasksarr[tasksarr.length - 1].id + 1 : 1
        const task = tasks
        const checked = false
        const priority = await selectedOption.length ? selectedOption : 'Low'
        const PriorityValue = Priority_Values[priority]
        const CreateDate = new Date()
        const Newobj = {id,task,checked,priority,PriorityValue,CreateDate}
        const NewArr = [...tasksarr,Newobj]
        const sortedArr = NewArr.sort((a,b)=> b.PriorityValue - a.PriorityValue)
        const SortByDate = sortedArr.sort((a,b)=>a.CreateDate - b.CreateDate)
        setTaskarr(SortByDate)
        setselectedoption('Low')
        setTasks('')
        localStorage.setItem('usertasks',JSON.stringify(NewArr))
        localStorage.removeItem('tasks')
        
    }
    const EditCheckBox = (id) => {
        const ModifyArr = tasksarr.map((item) => item.id === id ? {...item,checked:!item.checked} : item ) 
        setTaskarr(ModifyArr)
        localStorage.setItem('usertasks',JSON.stringify(ModifyArr))
    }
    const DeleteTask = (id) => {
        const DeletedArr = tasksarr.filter((item)=> item.id !== id)
        setTaskarr(DeletedArr)
        localStorage.setItem('usertasks',JSON.stringify(DeletedArr))
    }

  return (
    <section className='d-flex justify-content-center align-items-start custom border'>
        <ToastContainer position='top-center'/>
        <div className='border customargin '>
            <div className=''>
                <p className='text-center fw-medium fs-3 custom-logo logo-font'>Todo-List</p>
                <div className='d-flex justify-content-center'>
                <p className='fw-medium mt-2 me-2' style={{color:'blue'}}>{`Color Values =`} </p>   
                <p className='fw-medium mt-2'> High :</p>    
                <p className='color-box-high me-2'></p>
                <p className='fw-medium mt-2 '>Medium :</p>
                <p className='color-box-medium'></p>
                <p className='fw-medium mt-2 ms-2'>Low :</p>
                <p className='color-box-low '></p> 
                </div>
            </div>
            <div className='text-center'>
                <div>
                <input type='text' placeholder='Search' value={Search} onChange={(e)=>Setsearch(e.target.value)} className='custom-search-input '></input>
                </div>
                <input type='text' placeholder='Enter the Task' value={tasks} onChange={(e)=>setTasks(e.target.value)} className='custom-input '></input>
                
                <button type="button" className="btn fw-medium mb-2 me-1 w btn-success" onClick={()=>AddTask()}><IoMdAdd className='add-button' /></button>
            </div>
            <div className='mt-2 ms-3 d-flex justify-content-center'>
                <DropdownButton id="dropdown-basic-button" className=' fw-medium' title="Priority Level">
                <Dropdown.Item  onClick={()=>addOption('High')}>High</Dropdown.Item>
                <Dropdown.Item onClick={()=>addOption('Medium')}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={()=>addOption('Low')}>Low</Dropdown.Item>
                </DropdownButton>
                <p className='fw-medium mt-2 ms-1'>{ !selectedOption.length ? `: Low`   : `: ${selectedOption}` }</p>
            </div>
            {/* tasks Visibile area */}

                    <div className='mt-2 height'>
                       {tasksarr.length ? 
                       <> 
                        <ul>
                         {
                          tasksarr.map((item) =>(
                           
                            <li className='fw-medium  fs-5 li d-flex border  mt-2 margin-right' key={item.id}>
                                <input type='checkbox' checked={item.checked} className='custom-checkbox' onChange={()=>EditCheckBox(item.id)}></input>
                                <p className='ms-2  text-center cus-p font-size'>{item.task}</p>
                                <MdDelete className='custom-delete-button ms-2 ' onClick={()=>DeleteTask(item.id)}/>
                                {
                                    item.priority === 'High' ?
                                    <p className='color-box-high'></p> : 
                                    item.priority === 'Medium' ?
                                    <p className='color-box-medium'></p> :
                                    <p className='color-box-low'></p>
                                }
                            </li>
                          ))
                        }
                        </ul>
                       </>
                       :<p></p>
                      }
                    </div>
                        
                   
                    
                
            

        </div>
    </section>
  )
}

export default TodoList







