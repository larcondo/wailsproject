export function filterTodosByPri(todos: TodoArray, pri: number) {
  return todos.filter((t) => t.Priority === pri);
}

export function filterTodos(todos: TodoArray, filtros: PriFilter) {
  return todos.filter((t) => {
    switch (t.Priority) {
      case 2:
        return filtros.high;
      case 1:
        return filtros.low;
      case 0:
        return filtros.info;
      default:
        return true;
    }
  });
}
