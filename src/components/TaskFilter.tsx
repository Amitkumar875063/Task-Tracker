import React from 'react';
import { Task } from '../utils/localStorage';

interface TaskFilterProps {
  tasks: Task[];
  activeFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ tasks, activeFilter, onFilterChange }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const filters = [
    { key: 'all' as const, label: 'All', count: totalTasks, color: 'bg-gray-100 text-gray-700' },
    { key: 'pending' as const, label: 'Pending', count: pendingTasks, color: 'bg-amber-100 text-amber-700' },
    { key: 'completed' as const, label: 'Completed', count: completedTasks, color: 'bg-green-100 text-green-700' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
      <div className="flex flex-wrap gap-3">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeFilter === filter.key
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                : `${filter.color} hover:scale-105`
            }`}
          >
            <span>{filter.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              activeFilter === filter.key
                ? 'bg-white/20 text-white'
                : 'bg-white/50'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;