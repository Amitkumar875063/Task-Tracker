import React, { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';
import { Task, saveTasks, getTasks, clearUser } from '../utils/localStorage';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    const savedTasks = getTasks(username);
    setTasks(savedTasks);
  }, [username]);

  useEffect(() => {
    saveTasks(username, tasks);
  }, [tasks, username]);

  const handleAddTask = (taskData: { title: string; description: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      clearUser();
      onLogout();
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
                <p className="text-gray-600">Welcome back, {username}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="mb-6">
          <TaskFilter
            tasks={tasks}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
