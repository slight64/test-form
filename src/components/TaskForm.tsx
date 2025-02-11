import { useState, FormEvent, useEffect, useRef } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';

const baseUrl =
  'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask';

interface TaskFormData {
  token: string;
  title: string;
  description: string;
  tags: string;
  budgetFrom: number;
  budgetTo: number;
  deadline: number;
  reminds: number;
  allAutoResponses: boolean;
  rulesBudgetFrom: number;
  rulesBudgetTo: number;
  rulesDeadlineDays: number;
  rulesQtyFreelancers: number;
}

const initialFormData: TaskFormData = {
  token: '317ad1fc-e0a9-11ef-a978-0242ac120007',
  title: '',
  description: '',
  tags: '',
  budgetFrom: 0,
  budgetTo: 0,
  deadline: 0,
  reminds: 0,
  allAutoResponses: false,
  rulesBudgetFrom: 0,
  rulesBudgetTo: 0,
  rulesDeadlineDays: 0,
  rulesQtyFreelancers: 0,
};

export default function TaskForm() {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      token: formData.token,
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      budget_from: formData.budgetFrom.toString(),
      budget_to: formData.budgetTo.toString(),
      deadline: formData.deadline.toString(),
      reminds: formData.reminds.toString(),
      all_auto_responses: formData.allAutoResponses.toString(),
      rules: JSON.stringify({
        budget_from: formData.rulesBudgetFrom,
        budget_to: formData.rulesBudgetTo,
        deadline_days: formData.rulesDeadlineDays,
        qty_freelancers: formData.rulesQtyFreelancers,
      }),
    });

    try {
      const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
      if (response.ok) {
        alert('Задача опубликована успешно!');
        setFormData(initialFormData);
      } else {
        alert('Ошибка при публикации задачи.');
      }
    } catch (error) {
      alert('Ошибка сети: ' + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 text-black"
    >
      <h2 className="text-lg font-bold">Создайте задачу</h2>
      <Input
        label="Токен"
        type="text"
        name="token"
        placeholder="Токен"
        value={formData.token}
        onChange={handleChange}
        required
      />
      <Input
        ref={inputRef}
        label="Заголовок"
        type="text"
        name="title"
        placeholder="Заголовок"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Описание"
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <Input
        label="Теги"
        type="text"
        name="tags"
        placeholder="Теги (через запятую)"
        value={formData.tags}
        onChange={handleChange}
        required
      />
      <Input
        label="Бюджет от"
        type="number"
        name="budgetFrom"
        placeholder="Бюджет от"
        value={formData.budgetFrom}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        step={100}
        required
      />
      <Input
        label="Бюджет до"
        type="number"
        name="budgetTo"
        placeholder="Бюджет до"
        value={formData.budgetTo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        step={100}
        required
      />
      <Input
        label="Дедлайн (дни)"
        type="number"
        name="deadline"
        placeholder="Дедлайн (дни)"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        required
      />
      <Input
        label="Напоминания"
        type="number"
        name="reminds"
        placeholder="Напоминания"
        value={formData.reminds}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        required
      />
      <Input
        label="Включить автоответы"
        type="checkbox"
        name="allAutoResponses"
        checked={formData.allAutoResponses}
        onChange={handleChange}
        full={false}
      />
      <h3 className="text-lg font-bold">Правила</h3>
      <Input
        label="Бюджет от (правила)"
        type="number"
        name="rulesBudgetFrom"
        placeholder="Бюджет от (правила)"
        value={formData.rulesBudgetFrom}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        step={100}
        min={0}
        required
      />
      <Input
        label="Бюджет до (правила)"
        type="number"
        name="rulesBudgetTo"
        placeholder="Бюджет до (правила)"
        value={formData.rulesBudgetTo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        step={100}
        min={0}
        required
      />
      <Input
        label="Дедлайн (правила)"
        type="number"
        name="rulesDeadlineDays"
        placeholder="Дедлайн (правила)"
        value={formData.rulesDeadlineDays}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        required
      />
      <Input
        label="Кол-во фрилансеров"
        type="number"
        name="rulesQtyFreelancers"
        placeholder="Кол-во фрилансеров"
        value={formData.rulesQtyFreelancers}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min={0}
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Опубликовать задачу
      </button>
    </form>
  );
}
