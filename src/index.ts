import * as readline from 'readline';
import  FitnessTracker from './fit';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tracker = new FitnessTracker();

function promptUser() {
  function askOption() {
    rl.question('Choose an option: \n1. Add User\n2. Log Workout\n3. Get All Workouts\n4. Get Workouts by Type\n5. Get Users\n6. Get User\n7. Update User\n8. Exit\nEnter your choice: ', (choice) => {
      switch (choice) {
        case '1':
          rl.question('Enter name: ', (name) => {
            rl.question('Enter age: ', (age) => {
              rl.question('Enter weight: ', (weight) => {
                rl.question('Enter height: ', (height) => {
                  tracker.addUser({ name, age: Number(age), weight: Number(weight), height: Number(height) });
                  askOption();
                });
              });
            });
          });
          break;
        case '2':
          rl.question('Enter user ID: ', (userId) => {
            rl.question('Enter workout type: ', (type) => {
              rl.question('Enter duration (minutes): ', (duration) => {
                rl.question('Enter calories burned: ', (caloriesBurned) => {
                  tracker.logWorkout(userId, { type, duration: Number(duration), caloriesBurned: Number(caloriesBurned), date: new Date() });
                  console.log('Workout logged successfully!');
                  askOption();
                });
              });
            });
          });
          break;
        case '3':
          rl.question('Enter user ID: ', (userId) => {
            console.log(tracker.getAllWorkoutsOf(userId));
            askOption();
          });
          break;
        case '4':
          rl.question('Enter user ID: ', (userId) => {
            rl.question('Enter workout type: ', (type) => {
              console.log(tracker.getAllWorkoutsByType(userId, type));
              askOption();
            });
          });
          break;
        case '5':
          console.log(tracker.getUsers());
          askOption();
          break;
        case '6':
          rl.question('Enter user ID: ', (id) => {
            console.log(tracker.getUser(id));
            askOption();
          });
          break;
        case '7':
          rl.question('Enter user ID: ', (id) => {
            rl.question('Enter field to update (name, age, weight, height): ', (field) => {
              rl.question('Enter new value: ', (value) => {
                tracker.updateUser(id, { [field]: isNaN(Number(value)) ? value : Number(value) });
                console.log('User updated successfully!');
                askOption();
              });
            });
          });
          break;
        case '8':
          console.log('Exiting...');
          rl.close();
          break;
        default:
          console.log('Invalid option. Exiting...');
          rl.close();
      }
    });
  }
  askOption();
}

promptUser();
