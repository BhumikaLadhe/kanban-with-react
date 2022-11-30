import { useState, useEffect } from 'react'
import { styles } from './styles'
import Cards from '../cards'
import TaskList from '../../../utils/data.json'
const Dashboard = () => {

    const [tasks, setTasks] = useState();
    const [openTask, setNewTask] = useState(false)
    const [newLabel,setNewLabel] = useState()
    const bgColorMap = {
        new: 'lightBlue',
        wip: 'yellow',
        complete: 'lightgreen'
    }
    
      //this event is for the dragged task card.
      //this is required to save unique id in the dom event so that when we drop it we would know the card id
      const onDragStart = (event, id) => {
        console.log(event, id)
        event.dataTransfer.setData("id", id);
      };
    
      //fetches the card id and based on that update the status/category of that card in tasks state
      const onDrop = (event, cat) => {
        let id = event.dataTransfer.getData("id");
        let newTasks = tasks.filter((task) => {
          if (task.name == id) {
            task.category = cat;
            task.bgcolor = bgColorMap[cat]
          }
          return task;
        });
    
        setTasks([...newTasks]);
      };
    
      //method to filter tasks beased on their status
      const getTask = () => {
        const tasksToRender = {
            new:[],
          wip: [],
          complete: [],
        };
    
        //this div is the task card which is 'draggable' and calls onDragStart method
        //when we drag it

        tasks.forEach((t) => {
          tasksToRender[t.category].push(
            <Cards task={t} onDragStart={onDragStart}/>
          );
        });
    
        return tasksToRender;
      };

      useEffect(() => {
        // localStorage.setItem('list', JSON.stringify([]));
        const persistedData = JSON.parse(JSON.stringify((localStorage.getItem('list')))) !== 'undefined' ?  JSON.parse(JSON.stringify((localStorage.getItem('list'))))  : [TaskList];
        if(persistedData ) {
            setTasks(JSON.parse(persistedData))
            return
        }
        setTasks(TaskList)
      },[])

      const newTask =  {
        "name": "Create a New Task!!!",
        "category": "new",
        "bgcolor": "lightblue",
        "draggable": false
      }

      useEffect(() => {
        localStorage.setItem('list', JSON.stringify(tasks));
      }, [tasks]);

   const isEmpty = (obj) => obj === undefined || obj === {} || obj === null


  const openNewTask = () => {
    console.log('click')
    setNewTask(true)
   }
   const createNewTask = () => {
    const t = {
      "name": newLabel,
      "category": "new",
      "bgcolor": "lightblue",
      "draggable": true
    }
    setTasks([...tasks,t ]);
    setNewTask(false)

   }

   console.log(tasks, 'tasks')
      return (
        <div style={styles.dragDropContainer}>
          <h2 style={styles.dragDropHeader}>JIRA BOARD: Sprint 21U</h2>
          {isEmpty(tasks) ? 
         <div style={styles.dragDropBoard}>  loading..... </div> : 
          <div style={styles.dragDropBoard}>
          <div
              style={styles.wip}
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                onDrop(e, "new");
              }}
            >
              <div style={styles.taskHeader} >NEW</div>
              {getTask().new}
              {openTask && <div style={{ display:'flex', flexDirection: 'column'}}>
                <input style={{height: '50px', marginBottom: '10px'}} onChange={(e) => { setNewLabel(e.target.value) }}/>
                <button onClick={createNewTask}>Done</button>
                </div>
              }
              <Cards task={newTask} onClick={openNewTask} />
            </div>
            <div
              style={styles.wip}
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                onDrop(e, "wip");
              }}
            >
              <div style={styles.taskHeader}>In-PROGRESS</div>
              {getTask().wip}
            </div>
            <div
            draggable
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, "complete")}
            >
              <div style={styles.taskHeader}>COMPLETED</div>
              {getTask().complete}
            </div>
          </div>
}
        </div>
      );
    }


export default Dashboard