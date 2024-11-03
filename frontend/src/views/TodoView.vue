<template>
  <main>
    <div class="flex items-center gap-4 justify-between">
      <a-typography-title class="text-center uppercase">
        Todos
      </a-typography-title>
      <a-button type="primary" @click="isModalVisible = true">
        Add Todo
      </a-button>
    </div>
    <a-list item-layout="horizontal" :data-source="todos" :loading="loading">
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="w-full flex justify-between items-center gap-4">
            <a-list-item-meta
              class="flex-1"
              :class="{ 'line-through': item.completed }"
            >
              <template #title>
                <router-link :to="`/todo/${item.id}`">
                  {{ item?.title }}
                </router-link>
              </template>
              <template #description>
                {{ item?.description }}
              </template>
            </a-list-item-meta>
            <div>
              <a-dropdown-button>
                Actions
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" @click="updateHandler(item)">
                      Update
                    </a-menu-item>
                    <a-menu-item key="2" @click="completeTodo(item)">
                      {{ item.completed ? 'Uncomplete' : 'Complete' }}
                    </a-menu-item>
                    <a-menu-item key="3" @click="deleteHandler(item.id)">
                      Delete
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown-button>
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
    <a-modal
      v-model:open="isModalVisible"
      :title="isUpdate ? 'Update Todo' : 'Add Todo'"
      @ok="submitHandler"
    >
      <div class="flex flex-col gap-4 mt-4">
        <label class="flex flex-col mb-4">
          <span>Title</span>
          <a-input v-model:value="formState.title" />
        </label>
        <label class="flex flex-col mb-4">
          <span>Description</span>
          <a-textarea v-model:value="formState.description" />
        </label>
      </div>
    </a-modal>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const todos = ref([])
const isModalVisible = ref(false)
const isUpdate = ref(false)
const loading = ref(false)
const updateId = ref(null)

const formState = ref({
  title: '',
  description: '',
})

const updateHandler = item => {
  isUpdate.value = true
  isModalVisible.value = true
  formState.value.title = item.title
  formState.value.description = item.description
  updateId.value = item.id
}

const getAllTodos = async () => {
  try {
    loading.value = true
    const { data } = await axios('/api/todos')
    todos.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const submitHandler = async () => {
  if (!formState.value.title) return

  try {
    if (isUpdate.value) {
      const { data } = await axios.put(
        `/api/todos/${updateId.value}`,
        formState.value,
      )
    } else {
      const { data } = await axios.post('/api/todos', formState.value)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isModalVisible.value = false
    getAllTodos()
  }
}

const deleteHandler = async id => {
  try {
    await axios.delete(`/api/todos/${id}`)
  } catch (error) {
    console.error(error)
  } finally {
    getAllTodos()
  }
}

const completeTodo = async todo => {
  try {
    await axios.put(`/api/todos/${todo.id}`, { completed: !todo.completed })
  } catch (error) {
    console.error(error)
  } finally {
    getAllTodos()
  }
}

onMounted(getAllTodos)
</script>
