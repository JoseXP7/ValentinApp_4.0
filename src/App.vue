<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="overflow-hidden pt-16 md:pt-20">
    <RouterView v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <Component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
