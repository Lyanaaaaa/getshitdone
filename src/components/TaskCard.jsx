import Button from "./Button";

function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div
      className={`flex justify-between items-center p-4 border rounded-lg shadow-lg ${
        task.completed ? "bg-green-700 line-through" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="cursor-pointer"
        />
        <span>{task.name}</span>
      </div>
      <Button text="❌" onClick={onDelete} className="bg-red-500 text-white px-2" />
    </div>
  );
}

export default TaskCard;
