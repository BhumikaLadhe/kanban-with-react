import { taskCard } from './styles'

const Cards = ({ task, onDragStart, onClick }) => {
    console.log(task)
return ( <div
key={task.name}
onDragStart={(e) => onDragStart(e, task.name)}
draggable={task.draggable}
style={taskCard(task.bgcolor)}
onClick={onClick}
>
{task.name}
</div>
)}
export default Cards