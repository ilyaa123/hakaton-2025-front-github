<script setup lang="ts">
import { ref } from 'vue'

import ShowEyeIcon from '@/components/icons/ShowEyeIcon.vue'
import ClosedEyeIcon from '@/components/icons/ClosedEyeIcon.vue'

import { useRegisterStore } from './store'

const registerStore = useRegisterStore()

const { isLoading, form } = registerStore

const showPassword = ref(false),
  showConfirmPassword = ref(false)
</script>
<template>
  <el-sheet rounded="md">
    <el-text class="mb-2" tag="h1" size="2xl" align="center">Регистрация</el-text>
    <el-form @submit="registerStore.register">
      <el-text-field
        v-model="form.surname"
        :rules="[(e) => !!e || 'Это поле обязательное']"
        class="mb-4"
        label="Фамилия"
      />
      <el-text-field
        v-model="form.name"
        :rules="[(e) => !!e || 'Это поле обязательное']"
        class="mb-4"
        label="Имя"
      />
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
      <el-text-field
        :type="showConfirmPassword ? 'text' : 'password'"
        :rules="[
          (e) => !!e || 'Это поле обязательное',
          (e) => e.length >= 6 || 'Пароль должен быть не менее 6 символов',
          (e) => e == form.password || 'Пароли не совпадают',
        ]"
        class="mb-4"
        label="Повторите пароль"
      >
        <template #appendInner>
          <show-eye-icon
            v-if="showConfirmPassword"
            class="cursor-pointer"
            style="width: 30px; height: 30px"
            @click="showConfirmPassword = false"
          />
          <closed-eye-icon
            v-else
            class="cursor-pointer"
            style="width: 30px; height: 30px"
            @click="showConfirmPassword = true"
          />
        </template>
      </el-text-field>
      <el-button class="mb-2" :loading="isLoading" type="submit" color="secondary" block
        >Зарегистрироваться</el-button
      >
      <router-link to="/login">
        <el-text align="center"> Вход </el-text>
      </router-link>
    </el-form>
  </el-sheet>
</template>
