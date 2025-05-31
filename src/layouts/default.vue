<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BurgerMenuIcon from '@/components/icons/BurgerMenuIcon.vue'

import AppBar from '@/components/layouts/AppBar.vue'
import MenuNavigation from '@/components/layouts/MenuNavigation.vue'
import MobileNavigation from '@/components/layouts/MobileNavigation.vue'
import QrCode from '@/components/QrCode.vue'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useAuth } from '@/store/auth'

const route = useRoute(),
  router = useRouter()
const { user, logout } = useAuth()

const isMobile = useMediaQuery('(max-width: 1026px)')

const menu = [
  {
    title: 'События',
    to: '/events',
  },
  {
    title: 'Мои события',
    to: '/my-events',
  },
]

const mobileMenu = [
  {
    title: 'События',
    to: '/events',
  },
  {
    title: 'Мои события',
    to: '/my-events',
  },
  {
    title: 'Мой QR-код',
    to: '/my-qr',
  },
]

const drawerOpen = ref(false)

const breadcrumbs = computed(() =>
  route.matched
    .filter((item) => item.meta.title)
    .map((item) => ({
      title: item.meta.title,
      path: item.path,
    })),
)
</script>
<template>
  <el-container class="p-4">
    <div class="flex items-start justify-between gap-2">
      <menu-navigation v-if="!isMobile" style="max-width: 320px; width: 100%" :menu="menu" />
      <div class="w-full">
        <app-bar :breadcrumbs="breadcrumbs" class="w-full mb-2">
          <el-menu v-if="!isMobile">
            <template #activator="{ props }">
              <el-button v-bind="props"> {{ user?.first_name }} {{ user?.last_name }} </el-button>
            </template>
            <el-sheet rounded="lg">
              <ul class="space-y-2">
                <el-modal max-width="420px" width="100%">
                  <template #activator="{ props }">
                    <li
                      v-bind="props"
                      class="text-on-surface hover:text-on-primary cursor-pointer transition-colors text-base"
                    >
                      Мой QR-код
                    </li>
                  </template>
                  <el-sheet style="max-width: 420px; width: 100%" color="surface" rounded="lg">
                    <qr-code v-if="user?.id" :id="user.id" />
                  </el-sheet>
                </el-modal>

                <li
                  class="text-on-surface hover:text-on-error cursor-pointer transition-colors text-base"
                  @click="logout"
                >
                  Выход
                </li>
              </ul>
            </el-sheet>
          </el-menu>
          <burger-menu-icon v-if="isMobile" class="cursor-pointer" @click="drawerOpen = true" />
        </app-bar>
        <el-drawer v-model="drawerOpen">
          <mobile-navigation :menu="mobileMenu">
            <template #bottom>
              <div>
                <el-text class="mb-4" size="xl"
                  >{{ user?.first_name }} {{ user?.last_name }}</el-text
                >
                <el-button color="secondary" block @click="logout">Выход</el-button>
              </div>
            </template>
          </mobile-navigation>
        </el-drawer>
        <slot />
      </div>
    </div>
  </el-container>
</template>
