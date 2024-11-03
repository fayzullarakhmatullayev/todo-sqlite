<template>
  <a-typography-title class="text-center uppercase">
    {{ todo.title }}
  </a-typography-title>

  <a-typography-paragraph>
    {{ todo.description }}
  </a-typography-paragraph>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const { id } = useRoute().params

const todo = ref({})

const getTodo = async () => {
  try {
    const { data } = await axios.get(`/api/todos/${id}`)
    todo.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(getTodo)
</script>
