type Importance = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskProps {
  task: string;
  completed: boolean;
  importance: Importance;
  streak: number;
}
