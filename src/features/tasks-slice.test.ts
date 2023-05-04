import { addTask, convertFromDraft, taskReducer } from './tasks-slice';

describe('should test the tasks reducers', () => {
  const initialState = {
    entities: [
      convertFromDraft({
        title: 'Write tests',
      }),
    ],
  };
  it('should add the given task to the reducer', () => {
    const newTask = convertFromDraft({
      title: `Make it pass`,
    });
    const action = addTask(newTask);
    const newState = taskReducer(initialState, action);

    expect(newState.entities).toEqual([newTask, ...initialState.entities]);
  });
});
