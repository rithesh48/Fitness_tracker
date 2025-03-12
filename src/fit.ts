interface Workout {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
  }
  
  interface User {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
  }
  
  class FitnessTracker {
    private users: Map<string, User> = new Map();
    private workouts: Map<string, Workout[]> = new Map();
    private userCount: number = 0;
  
    addUser(user: Omit<User, 'id'>): void {
      const id = `ft${++this.userCount}`;
      const newUser: User = { id, ...user };
      this.users.set(id, newUser);
      this.workouts.set(id, []);
      console.log(`User added successfully with ID: ${id}`);
    }
  
    logWorkout(userId: string, workout: Workout): void {
      if (!this.users.has(userId)) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      this.workouts.get(userId)!.push(workout);
    }
  
    getAllWorkoutsOf(userId: string): Workout[] {
      if (!this.users.has(userId)) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return this.workouts.get(userId) || [];
    }
  
    getAllWorkoutsByType(userId: string, type: string): Workout[] {
      if (!this.users.has(userId)) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return (this.workouts.get(userId) || []).filter(w => w.type === type);
    }
  
    getUsers(): User[] {
      return Array.from(this.users.values());
    }
  
    getUser(id: string): User {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      return user;
    }
  
    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      this.users.set(id, { ...user, ...updatedFields });
    }
  }
  
  export default FitnessTracker;
  