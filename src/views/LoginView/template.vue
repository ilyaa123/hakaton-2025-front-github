<script setup lang="ts">
import { ref } from 'vue'

import ShowEyeIcon from '@/components/icons/ShowEyeIcon.vue'
import ClosedEyeIcon from '@/components/icons/ClosedEyeIcon.vue'

import { useLoginStore } from './store'

const showPassword = ref(false)

const loginStore = useLoginStore()

const { isLoading, form } = loginStore
</script>
<template>
  <el-sheet rounded="md">
    <el-text class="mb-2" tag="h1" size="2xl" align="center">Вход</el-text>
    <el-form @submit="loginStore.login">
      <el-text-field
        v-model="form.email"
        :rules="[
          (e) => !!e || 'Это поле обязательное',
          (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) || 'Введите корректный email',
        ]"
        class="mb-4"
        label="Email"
      />
      <el-text-field
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        :rules="[
          (e) => !!e || 'Это поле обязательное',
          (e) => e.length >= 6 || 'Пароль должен быть не менее 6 символов',
        ]"
        class="mb-4"
        label="Пароль"
      >
        <template #appendInner>
          <show-eye-icon
            v-if="showPassword"
            class="cursor-pointer"
            style="width: 30px; height: 30px"
            @click="showPassword = false"
          />
          <closed-eye-icon
            v-else
            class="cursor-pointer"
            style="width: 30px; height: 30px"
            @click="showPassword = true"
          />
        </template>
      </el-text-field>
      <el-button class="mb-2" :loading="isLoading" color="secondary" block type="submit"
        >Войти</el-button
      >
      <router-link to="/register">
        <el-text align="center"> Регистрация </el-text>
      </router-link>
    </el-form>
  </el-sheet>
</template>
