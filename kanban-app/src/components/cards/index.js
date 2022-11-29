import { taskCard } from './styles'

const Cards = ({ task, onDragStart }) => {
    console.log(task)
return ( <div
key={task.name}
onDragStart={(e) => onDragStart(e, task.name)}
draggable={task.draggable}
style={taskCard(task.bgcolor)}
>
{task.name}
</div>
)}
export default Cards