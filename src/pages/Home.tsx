import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {}, [tasks])

  function handleAddTask(newTaskTitle: string) {
    setTasks((oldState) => [
      ...oldState,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      },
    ])
  }

  function handleToggleTaskDone(id: number) {
    const editIndex = tasks.findIndex((task) => task.id === id)
    let tasksEdit = [...tasks]
    tasksEdit[editIndex].done = !tasksEdit[editIndex].done
    setTasks(tasksEdit)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover', 'Você tem certeza?', [
      {
        text: 'Sim',
        onPress: () => {
          const removeIndex = tasks.findIndex((task) => task.id === id)
          const tasksEdit = [...tasks]
          tasksEdit.splice(removeIndex, 1)
          setTasks(tasksEdit)
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
